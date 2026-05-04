import { describe, it, expect, vi, beforeEach } from 'vitest';
import bcrypt from 'bcryptjs';
import CreateUser from './create-user';
import { UserRepository } from '../../domain/repositories/user-repository';

vi.mock('bcryptjs', () => ({
    default: { hash: vi.fn() }
}));

describe('CreateUser', () => {
    let userRepository: UserRepository;
    let createUser: CreateUser;

    beforeEach(() => {
        userRepository = {
            create: vi.fn(),
            findByEmail: vi.fn(),
            findById: vi.fn(),
            update: vi.fn(),
            delete: vi.fn()
        } as unknown as UserRepository;
        createUser = new CreateUser(userRepository);
        vi.clearAllMocks();
    });

    it('should hash password and create user', async () => {
        const mockHashedPassword = 'hashed-password-123';
        const params = { email: 'test@example.com', password: 'password123' };
        
        vi.mocked(bcrypt.hash).mockResolvedValue(mockHashedPassword as never);
        vi.mocked(userRepository.create).mockResolvedValue({
            id: 1,
            email: params.email,
            password: mockHashedPassword,
            enabled: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as any);

        const result = await createUser.execute(params as any);

        expect(bcrypt.hash).toHaveBeenCalledWith(params.password, 10);
        expect(userRepository.create).toHaveBeenCalledWith(expect.objectContaining({
            email: params.email,
            password: mockHashedPassword,
            enabled: true
        }));
        expect(result.email).toBe(params.email);
    });
});