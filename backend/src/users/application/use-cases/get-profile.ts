import { UserRepository } from '../../domain/repositories/user-repository';
import { User } from '../../domain/entities/user-entity';

export default class GetProfile {
    constructor(private repository: UserRepository) {}

    async execute(id: number): Promise<User | null> {
        return this.repository.findById(id);
    }
}
