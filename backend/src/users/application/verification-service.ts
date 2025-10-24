import { redisClient } from '../../config/redis';
import crypto from 'crypto';
import { SendEmail } from '../../__shared__/__helpers__/sendMail';

export const sendRegistrationEmail = async (email: string) => {
    const verificationCode = crypto.randomInt(100000, 999999).toString();
    await redisClient.setEx(`verification:${email}`, 300, verificationCode);

    const sendEmail = new SendEmail();
    await sendEmail.sendVerificationEmail(email, verificationCode);
};

export const verifyCodeInRedis = async (email: string, verificationCode: string) => {
    const storedCode = await redisClient.get(`verification:${email}`);
    if (!storedCode || storedCode !== verificationCode) {
        return false;
    }
    await redisClient.del(`verification:${email}`);
    return true;
};
