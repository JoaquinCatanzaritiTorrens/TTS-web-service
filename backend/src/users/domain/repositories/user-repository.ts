import { User, UserProps } from '../entities/user-entity';

export interface UserRepository {
    create(props: Omit<UserProps, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
}
