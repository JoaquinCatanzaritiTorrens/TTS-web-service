import { Request, Response } from 'express';
import { ApiKeyService } from '../application/apikey-service';

const apiKeyService = new ApiKeyService();

export const createApiKey = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const { name } = req.body;
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ message: 'API key name is required' });
    }
    const { apiKey, rawKey } = await apiKeyService.createApiKey(userId, name.trim());
    return res.status(201).json({ apiKey, rawKey });
};

export const getApiKeys = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const keys = await apiKeyService.getApiKeysByUser(userId);
    return res.json(keys);
};

export const updateApiKeyName = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const id = parseInt(req.params.id, 10);
    const { name } = req.body;
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ message: 'API key name is required' });
    }
    const key = await apiKeyService.updateApiKeyName(id, userId, name.trim());
    return res.json(key);
};

export const toggleApiKey = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const id = parseInt(req.params.id, 10);
    const { enabled } = req.body;
    if (typeof enabled !== 'boolean') {
        return res.status(400).json({ message: 'enabled field (boolean) is required' });
    }
    const key = await apiKeyService.toggleApiKey(id, userId, enabled);
    return res.json(key);
};

export const deleteApiKey = async (req: Request, res: Response) => {
    const userId = (req as any).userId;
    const id = parseInt(req.params.id, 10);
    await apiKeyService.deleteApiKey(id, userId);
    return res.status(204).send();
};
