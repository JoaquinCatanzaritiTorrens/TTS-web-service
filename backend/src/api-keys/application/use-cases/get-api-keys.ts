import { ApiKeyRepository } from '../../domain/repositories/api-key-repository';
import { ApiKey } from '../../domain/entities/api-key-entity';

export default class GetApiKeys {
    constructor(private repo: ApiKeyRepository) {}
    
    async execute(userId: number): Promise<(ApiKey & { usageCount: number; lastUsedAt: Date | null })[]> {
        return await this.repo.findByUserId(userId);
    }
}