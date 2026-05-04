import { describe, it, expect, vi, beforeEach } from 'vitest';
import crypto from 'crypto';
import SendVerificationCode from './send-verification-code';
import { redisClient } from '../../../config/redis';
import { SendEmail } from '../../../__shared__/__helpers__/sendMail';

vi.mock('crypto', () => ({
    default: { randomInt: vi.fn() }
}));

vi.mock('../../../config/redis', () => ({
    redisClient: { setEx: vi.fn() }
}));

vi.mock('../../../__shared__/__helpers__/sendMail', () => {
    return {
        SendEmail: vi.fn().mockImplementation(() => ({
            sendVerificationEmail: vi.fn(),
            sendContactEmail: vi.fn()
        }))
    };
});

describe('SendVerificationCode', () => {
    let sendVerificationCode: SendVerificationCode;

    beforeEach(() => {
        sendVerificationCode = new SendVerificationCode();
        vi.clearAllMocks();
    });

    it('should generate code, save to redis, and send email', async () => {
        vi.mocked(crypto.randomInt).mockReturnValue(123456 as never);
        const sendValidationEmailMock = vi.fn();
        
        vi.mocked(SendEmail).mockImplementation(function() {
            return {
                sendVerificationEmail: sendValidationEmailMock,
                sendContactEmail: vi.fn(),
                sendEmail: vi.fn(),
                loadTemplate: vi.fn(),
            } as any;
        });

        await sendVerificationCode.execute('test@example.com');

        expect(crypto.randomInt).toHaveBeenCalledWith(100000, 999999);
        expect(redisClient.setEx).toHaveBeenCalledWith('verification:test@example.com', 300, '123456');
        expect(sendValidationEmailMock).toHaveBeenCalledWith('test@example.com', '123456');
    });
});