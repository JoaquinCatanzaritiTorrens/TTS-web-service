import bcrypt from 'bcryptjs';
import { UserRepository } from '../../domain/repositories/user-repository';
import { User, UserProps } from '../../domain/entities/user-entity';

export default class CreateUser {
    constructor(private repository: UserRepository) {}

    async execute(params: Omit<UserProps, 'id' | 'createdAt' | 'updatedAt' | 'enabled'>): Promise<User> {
        const hashedPassword = await bcrypt.hash(params.password, 10);
        return this.repository.create({
            email: params.email,
            password: hashedPassword,
            enabled: true
        });
    }
}
