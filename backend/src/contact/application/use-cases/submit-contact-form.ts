import { ContactRepository } from '../../domain/repositories/contact-repository';
import { Contact, ContactProps } from '../../domain/entities/contact-entity';
import { SendEmail } from '../../../__shared__/__helpers__/sendMail';

export default class SubmitContactForm {
    constructor(private repository: ContactRepository) {}

    async execute(params: Omit<ContactProps, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contact> {
        const sendEmail = new SendEmail();
        await sendEmail.sendContactEmail(params.name, params.email, params.message || '');
        
        return this.repository.create(params);
    }
}
