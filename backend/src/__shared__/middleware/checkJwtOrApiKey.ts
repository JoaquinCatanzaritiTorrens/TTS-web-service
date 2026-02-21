import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiKeyService } from '../../apikeys/application/apikey-service';
import { redisClient } from '../../config/redis';

const jwtSecret = process.env.JWT_SECRET || 'defaultSecret';
const apiKeyService = new ApiKeyService();
const RATE_LIMIT = 5;

export const checkJwtOrApiKey = async (req: Request, res: Response, next: NextFunction) => {
    // 1. Try JWT cookie (internal requests)
    const token = req.cookies?.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, jwtSecret) as any;
            (req as any).user = decoded;
            (req as any).userId = decoded.id;
            (req as any).apiKeyId = null;
            return next();
        } catch {
            // Fall through to API key check
        }
    }

    // 2. Try API key (external requests)
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const rawKey = authHeader.slice(7);
        const apiKey = await apiKeyService.validateApiKey(rawKey);

        if (!apiKey) {
            return res.status(401).json({ message: 'Invalid or disabled API key' });
        }

        const windowKey = `rate:apikey:${apiKey.id}:${Math.floor(Date.now() / 60000)}`;
        const current = await redisClient.incr(windowKey);
        if (current === 1) {
            await redisClient.expire(windowKey, 60);
        }

        if (current > RATE_LIMIT) {
            return res.status(429).json({
                message: `Rate limit exceeded. Maximum ${RATE_LIMIT} requests per minute.`,
            });
        }

        (req as any).apiKeyId = apiKey.id;
        (req as any).userId = apiKey.userId;
        return next();
    }

    return res.status(403).json({ message: 'Access denied. Provide a valid session cookie or Authorization: Bearer <api_key> header.' });
};
