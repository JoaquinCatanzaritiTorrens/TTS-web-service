import { ApiKeyRepository } from '../../domain/repositories/api-key-repository';

export default class DeleteApiKey {
    constructor(private repo: ApiKeyRepository) {}

    async execute(id: number, userId: number): Promise<void> {
        const key = await this.repo.findByIdAndUserId(id, userId);
        if (!key) throw new Error('API key not found');
        await this.repo.delete(key);
    }
}