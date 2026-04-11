import { ApiKeyRepository } from '../../domain/repositories/api-key-repository';
import { ApiKey } from '../../domain/entities/api-key-entity';

export default class ToggleApiKey {
    constructor(private repo: ApiKeyRepository) {}

    async execute(id: number, userId: number, enabled: boolean): Promise<ApiKey> {
        const key = await this.repo.findByIdAndUserId(id, userId);
        if (!key) throw new Error('API key not found');
        
        const updatedKey = new ApiKey({ ...key, enabled });
        return await this.repo.save(updatedKey);
    }
}