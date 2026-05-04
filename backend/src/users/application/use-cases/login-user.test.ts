import { describe, it, expect, vi, beforeEach } from 'vitest';
import bcrypt from 'bcryptjs';
import LoginUser from './login-user';
import { UserRepository } from '../../domain/repositories/user-repository';

vi.mock('bcryptjs', () => ({
    default: { compare: vi.fn() }
}));

describe('LoginUser', () => {
    let userRepository: UserRepository;
    let loginUser: LoginUser;

    beforeEach(() => {
        userRepository = {
            findByEmail: vi.fn(),
        } as unknown as UserRepository;
        loginUser = new LoginUser(userRepository);
        vi.clearAllMocks();
    });

    it('should return null if user is not found', async () => {
        vi.mocked(userRepository.findByEmail).mockResolvedValue(null);
        const result = await loginUser.execute('test@example.com', 'password123');
        expect(result).toBeNull();
    });

    it('should return null if password is invalid', async () => {
        const mockUser = { id: 1, email: 'test@example.com', password: 'hashed-password' };
        vi.mocked(userRepository.findByEmail).mockResolvedValue(mockUser as any);
        vi.mocked(bcrypt.compare).mockResolvedValue(false as never);

        const result = await loginUser.execute('test@example.com', 'wrong-pass');
        expect(result).toBeNull();
    });

    it('should return user if credentials are valid', async () => {
        const mockUser = { id: 1, email: 'test@example.com', password: 'hashed-password' };
        vi.mocked(userRepository.findByEmail).mockResolvedValue(mockUser as any);
        vi.mocked(bcrypt.compare).mockResolvedValue(true as never);

        const result = await loginUser.execute('test@example.com', 'password123');
        expect(result).toEqual(mockUser);
    });
});