import { describe, it, expect, vi, beforeEach } from 'vitest';
import { checkJwtOrApiKey } from './checkJwtOrApiKey';
import jwt from 'jsonwebtoken';
import { redisClient } from '../../config/redis';
import ValidateApiKey from '../../api-keys/application/use-cases/validate-api-key';

vi.mock('jsonwebtoken');
vi.mock('../../config/redis', () => ({
    redisClient: {
        incr: vi.fn(),
        expire: vi.fn(),
    }
}));
vi.mock('../../config/data-source', () => ({
    AppDataSource: {}
}));
vi.mock('../../api-keys/infrastructure/database/typeorm/api-key-typeorm-repository');
vi.mock('../../api-keys/application/use-cases/validate-api-key');

describe('checkJwtOrApiKey Middleware', () => {
    let mockReq: any;
    let mockRes: any;
    let mockNext: any;

    beforeEach(() => {
        mockReq = {
            cookies: {},
            headers: {}
        };
        mockRes = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        mockNext = vi.fn();
        vi.clearAllMocks();
    });

    it('should validate via valid JWT in cookies', async () => {
        mockReq.cookies.token = 'valid-token';
        const decodedToken = { id: 10 };
        vi.mocked(jwt.verify).mockReturnValue(decodedToken as any);

        await checkJwtOrApiKey(mockReq, mockRes, mockNext);

        expect(jwt.verify).toHaveBeenCalled();
        expect(mockReq.userId).toBe(10);
        expect(mockReq.apiKeyId).toBeNull();
        expect(mockNext).toHaveBeenCalled();
    });

    it('should fallback to API key if JWT is invalid but auth header exists', async () => {
        // Fallback from invalid JWT
        mockReq.cookies.token = 'invalid-token';
        vi.mocked(jwt.verify).mockImplementation(() => { throw new Error(); });

        mockReq.headers['authorization'] = 'Bearer my-api-key';
        
        vi.mocked(ValidateApiKey.prototype.execute).mockResolvedValue({
            id: 20,
            userId: 30,
            key_hash: 'hash',
            is_active: true,
            created_at: new Date(),
            name: 'test'
        });
        vi.mocked(redisClient.incr).mockResolvedValue(1);

        await checkJwtOrApiKey(mockReq, mockRes, mockNext);

        expect(mockReq.apiKeyId).toBe(20);
        expect(mockReq.userId).toBe(30);
        expect(redisClient.expire).toHaveBeenCalled();
        expect(mockNext).toHaveBeenCalled();
    });

    it('should fail if API key is invalid', async () => {
        mockReq.headers['authorization'] = 'Bearer invalid-key';
        vi.mocked(ValidateApiKey.prototype.execute).mockResolvedValue(null);

        await checkJwtOrApiKey(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Invalid or disabled API key' });
    });

    it('should fail with 429 if rate limit exceeded', async () => {
        mockReq.headers['authorization'] = 'Bearer valid-key';
        vi.mocked(ValidateApiKey.prototype.execute).mockResolvedValue({ id: 20, userId: 30 } as any);
        vi.mocked(redisClient.incr).mockResolvedValue(6);

        await checkJwtOrApiKey(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(429);
        expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ message: expect.stringContaining('Rate limit exceeded') }));
    });

    it('should return 403 if no auth method provided', async () => {
        await checkJwtOrApiKey(mockReq, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(403);
        expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ message: expect.stringContaining('Access denied') }));
    });
});