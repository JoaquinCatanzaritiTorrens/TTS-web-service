import crypto from 'crypto';
import { AppDataSource } from '../../config/data-source';
import { ApiKey } from '../domain/model/ApiKey';
import { ApiKeyRequest } from '../domain/model/ApiKeyRequest';

const KEY_PREFIX = 'tts_';

const hashKey = (rawKey: string): string =>
    crypto.createHash('sha256').update(rawKey).digest('hex');

export class ApiKeyService {
    private get repo() {
        return AppDataSource.getRepository(ApiKey);
    }

    private get requestRepo() {
        return AppDataSource.getRepository(ApiKeyRequest);
    }

    async createApiKey(userId: number, name: string): Promise<{ apiKey: ApiKey; rawKey: string }> {
        const rawKey = KEY_PREFIX + crypto.randomBytes(32).toString('hex');
        const keyHash = hashKey(rawKey);
        const keyPreview = rawKey.slice(-4);

        const apiKey = this.repo.create({ keyHash, keyPreview, name, userId, enabled: true });
        const saved = await this.repo.save(apiKey);
        return { apiKey: saved, rawKey };
    }

    async getApiKeysByUser(userId: number): Promise<(ApiKey & { usageCount: number; lastUsedAt: Date | null })[]> {
        const keys = await this.repo
            .createQueryBuilder('ak')
            .where('ak.user_id = :userId', { userId })
            .orderBy('ak.created_at', 'DESC')
            .getMany();

        const results = await Promise.all(
            keys.map(async (key) => {
                const usageCount = await this.requestRepo.count({ where: { apiKeyId: key.id } });
                const lastReq = await this.requestRepo.findOne({
                    where: { apiKeyId: key.id },
                    order: { createdAt: 'DESC' },
                });
                return Object.assign(key, {
                    usageCount,
                    lastUsedAt: lastReq ? lastReq.createdAt : null,
                });
            })
        );

        return results;
    }

    async updateApiKeyName(id: number, userId: number, name: string): Promise<ApiKey> {
        const key = await this.repo.findOne({ where: { id, userId } });
        if (!key) throw new Error('API key not found');
        key.name = name;
        return await this.repo.save(key);
    }

    async toggleApiKey(id: number, userId: number, enabled: boolean): Promise<ApiKey> {
        const key = await this.repo.findOne({ where: { id, userId } });
        if (!key) throw new Error('API key not found');
        key.enabled = enabled;
        return await this.repo.save(key);
    }

    async deleteApiKey(id: number, userId: number): Promise<void> {
        const key = await this.repo.findOne({ where: { id, userId } });
        if (!key) throw new Error('API key not found');
        await this.repo.remove(key);
    }

    async validateApiKey(rawKey: string): Promise<ApiKey | null> {
        const keyHash = hashKey(rawKey);
        const key = await this.repo.findOne({ where: { keyHash, enabled: true } });
        return key ?? null;
    }

    async recordRequest(apiKeyId: number | null, userId: number | null): Promise<void> {
        const request = this.requestRepo.create({ apiKeyId, userId });
        await this.requestRepo.save(request);
    }
}
