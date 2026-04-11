import bcrypt from 'bcryptjs';
import { UserRepository } from '../../domain/repositories/user-repository';
import { User } from '../../domain/entities/user-entity';

export default class LoginUser {
    constructor(private repository: UserRepository) {}

    async execute(email: string, password: string): Promise<User | null> {
        const user = await this.repository.findByEmail(email);
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;

        return user;
    }
}
