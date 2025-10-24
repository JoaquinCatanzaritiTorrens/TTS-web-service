import { Router } from 'express';
import { sendContactMail } from './contact-controller';

const router = Router();

router.post('/send-contact-mail', sendContactMail);

export default router;
