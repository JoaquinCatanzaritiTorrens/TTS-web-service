import { Contact, ContactProps } from '../entities/contact-entity';

export interface ContactRepository {
    create(props: Omit<ContactProps, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contact>;
}
