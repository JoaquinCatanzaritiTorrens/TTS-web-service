import { Repository, DataSource } from 'typeorm';
import { ApiKeyOrmEntity } from './api-key-orm-entity';
import { ApiKeyRequestOrmEntity } from './api-key-request-orm-entity';
import { ApiKey, ApiKeyProps } from '../../../domain/entities/api-key-entity';
import { ApiKeyRepository } from '../../../domain/repositories/api-key-repository';
import { ApiKeyRequest } from '../../../domain/entities/api-key-request-entity';

export default class ApiKeyTypeOrmRepository implements ApiKeyRepository {
    private keyRepo: Repository<ApiKeyOrmEntity>;
    private reqRepo: Repository<ApiKeyRequestOrmEntity>;

    constructor(dataSource: DataSource) {
        this.keyRepo = dataSource.getRepository(ApiKeyOrmEntity);
        this.reqRepo = dataSource.getRepository(ApiKeyRequestOrmEntity);
    }

    async create(props: Omit<ApiKeyProps, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiKey> {
        const entity = this.keyRepo.create(props);
        const result = await this.keyRepo.save(entity);
        return this.toDomain(result);
    }

    async findByUserId(userId: number): Promise<(ApiKey & { usageCount: number; lastUsedAt: Date | null })[]> {
        const keys = await this.keyRepo.find({ where: { userId }, order: { createdAt: 'DESC' } });
        return await Promise.all(
            keys.map(async (key) => {
                const usageCount = await this.reqRepo.count({ where: { apiKeyId: key.id } });
                const lastReq = await this.reqRepo.findOne({ where: { apiKeyId: key.id }, order: { createdAt: 'DESC' } });
                return Object.assign(this.toDomain(key), { usageCount, lastUsedAt: lastReq ? lastReq.createdAt : null });
            })
        );
    }

    async findByIdAndUserId(id: number, userId: number): Promise<ApiKey | null> {
        const result = await this.keyRepo.findOne({ where: { id, userId } });
        if (!result) return null;
        return this.toDomain(result);
    }

    async findByHash(keyHash: string): Promise<ApiKey | null> {
        const result = await this.keyRepo.findOne({ where: { keyHash } });
        if (!result) return null;
        return this.toDomain(result);
    }

    async save(apiKey: ApiKey): Promise<ApiKey> {
        const entity = await this.keyRepo.save(apiKey);
        return this.toDomain(entity);
    }

    async delete(apiKey: ApiKey): Promise<void> {
        await this.keyRepo.delete(apiKey.id);
    }

    async recordRequest(apiKeyId: number | null, userId: number | null): Promise<ApiKeyRequest> {
        const req = this.reqRepo.create({ apiKeyId, userId });
        const result = await this.reqRepo.save(req);
        return new ApiKeyRequest({ id: result.id, apiKeyId: result.apiKeyId, userId: result.userId, createdAt: result.createdAt });
    }

    private toDomain(entity: ApiKeyOrmEntity): ApiKey {
        return new ApiKey({ id: entity.id, keyHash: entity.keyHash, keyPreview: entity.keyPreview, name: entity.name, userId: entity.userId, enabled: entity.enabled, createdAt: entity.createdAt, updatedAt: entity.updatedAt });
    }
}