import { Request, Response } from 'express';
import { ContactService } from '../application/contact-service';

const contactService = new ContactService();

export const sendContactMail = async (req: Request, res: Response) => {
    const { name, email, message } = req.body;

    try {
        await contactService.createContact(name, email, message);
        return res.status(201).json({ message: 'Contact form executed successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error in contact form', error });
    }
};