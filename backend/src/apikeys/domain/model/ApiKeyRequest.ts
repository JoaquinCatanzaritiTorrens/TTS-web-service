import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    Column,
} from 'typeorm';
import { ApiKey } from './ApiKey';
import { User } from '../../../users/domain/model/User';

@Entity({ name: 'api_key_requests' })
export class ApiKeyRequest {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'api_key_id', nullable: true })
    apiKeyId!: number | null;

    @ManyToOne(() => ApiKey, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'api_key_id' })
    apiKey!: ApiKey | null;

    @Column({ name: 'user_id', nullable: true })
    userId!: number | null;

    @ManyToOne(() => User, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'user_id' })
    user!: User | null;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}
