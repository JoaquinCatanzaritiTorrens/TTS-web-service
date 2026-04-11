import { ApiKey, ApiKeyProps } from '../entities/api-key-entity';
import { ApiKeyRequest } from '../entities/api-key-request-entity';

export interface ApiKeyRepository {
    create(props: Omit<ApiKeyProps, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiKey>;
    findByUserId(userId: number): Promise<(ApiKey & { usageCount: number; lastUsedAt: Date | null })[]>;
    findByIdAndUserId(id: number, userId: number): Promise<ApiKey | null>;
    findByHash(keyHash: string): Promise<ApiKey | null>;
    save(apiKey: ApiKey): Promise<ApiKey>;
    delete(apiKey: ApiKey): Promise<void>;
    recordRequest(apiKeyId: number | null, userId: number | null): Promise<ApiKeyRequest>;
}