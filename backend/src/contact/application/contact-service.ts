import { SendEmail } from '../../__shared__/__helpers__/sendMail';
import { AppDataSource } from '../../config/data-source';
import { Contact } from '../domain/model/Contact';

export class ContactService {

  private contactRepository = AppDataSource.getRepository(Contact);

  async createContact(name: string, email: string, message: string): Promise<Contact> {

    const sendEmail = new SendEmail();

    await sendEmail.sendContactEmail(name, email, message);

    const contact = this.contactRepository.create({ name, email, message });
    return await this.contactRepository.save(contact);
  }

}
