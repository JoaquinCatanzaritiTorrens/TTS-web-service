import crypto from 'crypto';
import { ApiKeyRepository } from '../../domain/repositories/api-key-repository';
import { ApiKey } from '../../domain/entities/api-key-entity';

const hashKey = (rawKey: string): string => crypto.createHash('sha256').update(rawKey).digest('hex');

export default class ValidateApiKey {
    constructor(private repo: ApiKeyRepository) {}

    async execute(rawKey: string): Promise<ApiKey | null> {
        const keyHash = hashKey(rawKey);
        const key = await this.repo.findByHash(keyHash);
        if (key && key.enabled) return key;
        return null;
    }
}