import bcrypt from 'bcryptjs';
import { AppDataSource } from '../../config/data-source';
import { User } from '../domain/model/User';

export class UserService {
  private get userRepository() {
    return AppDataSource.getRepository(User);
  }

  async createUser(email: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ email, password: hashedPassword, enabled: true });
    return await this.userRepository.save(user);
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async comparePassword(plainText: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainText, hashedPassword);
  }
}
