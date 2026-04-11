import { Router, Request, Response } from 'express';
import { AppDataSource } from '../../config/data-source';
import ContactTypeOrmRepository from './database/typeorm/contact-typeorm-repository';
import SubmitContactForm from '../application/use-cases/submit-contact-form';

const router = Router();

router.post('/send-contact-mail', async (req: Request, res: Response) => {
    const repository = new ContactTypeOrmRepository(AppDataSource);
    const submitContactForm = new SubmitContactForm(repository);
    
    const { name, email, message } = req.body;

    try {
        await submitContactForm.execute({ name, email, message });
        return res.status(201).json({ message: 'Contact form executed successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error in contact form', error });
    }
});

export default router;
