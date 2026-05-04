import { describe, it, expect, vi } from 'vitest';
import GetProfile from './get-profile';
import { UserRepository } from '../../domain/repositories/user-repository';
import { User } from '../../domain/entities/user-entity';

describe('GetProfile Use Case', () => {
    it('should return a user if found by id', async () => {
        // Mocking the dependency
        const mockUserRepository = {
            findById: vi.fn(),
            findByEmail: vi.fn(),
            save: vi.fn(),
        } as unknown as UserRepository;

        const fakeUser: User = {
            id: 1,
            email: 'test@example.com',
            password: 'hash',
            enabled: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        vi.mocked(mockUserRepository.findById).mockResolvedValue(fakeUser);

        const getProfile = new GetProfile(mockUserRepository);
        const result = await getProfile.execute(1);

        expect(mockUserRepository.findById).toHaveBeenCalledWith(1);
        expect(result).toEqual(fakeUser);
    });

    it('should return null if user is not found', async () => {
        const mockUserRepository = {
            findById: vi.fn(),
        } as unknown as UserRepository;

        vi.mocked(mockUserRepository.findById).mockResolvedValue(null);

        const getProfile = new GetProfile(mockUserRepository);
        const result = await getProfile.execute(999);

        expect(result).toBeNull();
    });
});