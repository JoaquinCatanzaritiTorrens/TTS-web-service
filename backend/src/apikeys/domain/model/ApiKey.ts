import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from '../../../users/domain/model/User';

@Entity({ name: 'api_keys' })
export class ApiKey {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'key_hash', unique: true })
    keyHash!: string;

    @Column({ name: 'key_preview', length: 4 })
    keyPreview!: string;

    @Column({ length: 100 })
    name!: string;

    @Column({ name: 'user_id' })
    userId!: number;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column({ default: true })
    enabled!: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}
