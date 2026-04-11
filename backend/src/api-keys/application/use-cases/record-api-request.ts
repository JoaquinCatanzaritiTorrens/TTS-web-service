import { ApiKeyRepository } from '../../domain/repositories/api-key-repository';

export default class RecordApiRequest {
    constructor(private repo: ApiKeyRepository) {}

    async execute(apiKeyId: number | null, userId: number | null): Promise<void> {
        await this.repo.recordRequest(apiKeyId, userId);
    }
}