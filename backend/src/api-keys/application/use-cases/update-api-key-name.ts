import { ApiKeyRepository } from '../../domain/repositories/api-key-repository';
import { ApiKey } from '../../domain/entities/api-key-entity';

export default class UpdateApiKeyName {
    constructor(private repo: ApiKeyRepository) {}

    async execute(id: number, userId: number, name: string): Promise<ApiKey> {
        const key = await this.repo.findByIdAndUserId(id, userId);
        if (!key) throw new Error('API key not found');
        
        const updatedKey = new ApiKey({ ...key, name });
        return await this.repo.save(updatedKey);
    }
}