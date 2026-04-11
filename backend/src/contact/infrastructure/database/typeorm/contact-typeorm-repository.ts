import { Repository, DataSource } from 'typeorm';
import { ContactOrmEntity } from './contact-orm-entity';
import { Contact, ContactProps } from '../../../domain/entities/contact-entity';
import { ContactRepository } from '../../../domain/repositories/contact-repository';

export default class ContactTypeOrmRepository implements ContactRepository {
    private repository: Repository<ContactOrmEntity>;

    constructor(dataSource: DataSource) {
        this.repository = dataSource.getRepository(ContactOrmEntity);
    }

    async create(props: Omit<ContactProps, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contact> {
        const entity = this.repository.create(props);
        const result = await this.repository.save(entity);
        return this.toDomain(result);
    }

    private toDomain(entity: ContactOrmEntity): Contact {
        return new Contact({
            id: entity.id,
            name: entity.name,
            email: entity.email,
            message: entity.message,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        });
    }
}
