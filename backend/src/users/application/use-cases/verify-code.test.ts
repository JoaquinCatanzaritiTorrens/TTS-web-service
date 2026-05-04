import { describe, it, expect, vi, beforeEach } from 'vitest';
import VerifyCode from './verify-code';
import { redisClient } from '../../../config/redis';

vi.mock('../../../config/redis', () => ({
    redisClient: {
        get: vi.fn(),
        del: vi.fn()
    }
}));

describe('VerifyCode', () => {
    let verifyCode: VerifyCode;

    beforeEach(() => {
        verifyCode = new VerifyCode();
        vi.clearAllMocks();
    });

    it('should return false if code is not found', async () => {
        vi.mocked(redisClient.get).mockResolvedValue(null);
        const result = await verifyCode.execute('test@example.com', '123456');
        expect(result).toBe(false);
    });

    it('should return false if code mismatches', async () => {
        vi.mocked(redisClient.get).mockResolvedValue('000000');
        const result = await verifyCode.execute('test@example.com', '123456');
        expect(result).toBe(false);
    });

    it('should return true and delete key if match', async () => {
        vi.mocked(redisClient.get).mockResolvedValue('123456');
        const result = await verifyCode.execute('test@example.com', '123456');
        expect(redisClient.del).toHaveBeenCalledWith('verification:test@example.com');
        expect(result).toBe(true);
    });
});