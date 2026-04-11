import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { ApiKeyOrmEntity } from './api-key-orm-entity';
import { UserOrmEntity } from '../../../../users/infrastructure/database/typeorm/user-orm-entity';

@Entity({ name: 'api_key_requests' })
export class ApiKeyRequestOrmEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'api_key_id', nullable: true })
    apiKeyId!: number | null;

    @ManyToOne(() => ApiKeyOrmEntity, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'api_key_id' })
    apiKey!: ApiKeyOrmEntity | null;

    @Column({ name: 'user_id', nullable: true })
    userId!: number | null;

    @ManyToOne(() => UserOrmEntity, { nullable: true, onDelete: 'SET NULL' })
    @JoinColumn({ name: 'user_id' })
    user!: UserOrmEntity | null;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;
}