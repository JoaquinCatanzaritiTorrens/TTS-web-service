import { redisClient } from '../../../config/redis';

export default class VerifyCode {
    async execute(email: string, verificationCode: string): Promise<boolean> {
        const storedCode = await redisClient.get(`verification:${email}`);
        if (!storedCode || storedCode !== verificationCode) {
            return false;
        }
        await redisClient.del(`verification:${email}`);
        return true;
    }
}
