import crypto from 'crypto';
import { ApiKeyRepository } from '../../domain/repositories/api-key-repository';
import { ApiKey } from '../../domain/entities/api-key-entity';

const KEY_PREFIX = 'tts_';
const hashKey = (rawKey: string): string => crypto.createHash('sha256').update(rawKey).digest('hex');

export default class CreateApiKey {
    constructor(private repo: ApiKeyRepository) {}
    
    async execute(userId: number, name: string): Promise<{ apiKey: ApiKey; rawKey: string }> {
        const rawKey = KEY_PREFIX + crypto.randomBytes(32).toString('hex');
        const keyHash = hashKey(rawKey);
        const keyPreview = rawKey.slice(-4);

        const apiKey = await this.repo.create({ keyHash, keyPreview, name, userId, enabled: true });
        return { apiKey, rawKey };
    }
}