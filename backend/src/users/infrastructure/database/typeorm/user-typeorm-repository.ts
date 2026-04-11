import { Repository, DataSource } from 'typeorm';
import { UserOrmEntity } from './user-orm-entity';
import { User, UserProps } from '../../../domain/entities/user-entity';
import { UserRepository } from '../../../domain/repositories/user-repository';

export default class UserTypeOrmRepository implements UserRepository {
    private repository: Repository<UserOrmEntity>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(UserOrmEntity);
    }

    async create(props: Omit<UserProps, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
        const entity = this.repository.create(props);
        const result = await this.repository.save(entity);
        return this.toDomain(result);
    }

    async findByEmail(email: string): Promise<User | null> {
        const result = await this.repository.findOne({ where: { email } });
        if (!result) return null;
        return this.toDomain(result);
    }

    async findById(id: number): Promise<User | null> {
        const result = await this.repository.findOne({ where: { id } });
        if (!result) return null;
        return this.toDomain(result);
    }

    private toDomain(entity: UserOrmEntity): User {
        return new User({
            id: entity.id,
            email: entity.email,
            password: entity.password,
            enabled: entity.enabled,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        });
    }
}
