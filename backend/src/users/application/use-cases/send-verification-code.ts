import crypto from 'crypto';
import { redisClient } from '../../../config/redis';
import { SendEmail } from '../../../__shared__/__helpers__/sendMail';

export default class SendVerificationCode {
    async execute(email: string): Promise<void> {
        const verificationCode = crypto.randomInt(100000, 999999).toString();
        await redisClient.setEx(`verification:${email}`, 300, verificationCode);

        const sendEmail = new SendEmail();
        await sendEmail.sendVerificationEmail(email, verificationCode);
    }
}
