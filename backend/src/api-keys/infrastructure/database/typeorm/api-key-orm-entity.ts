import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserOrmEntity } from '../../../../users/infrastructure/database/typeorm/user-orm-entity';

@Entity({ name: 'api_keys' })
export class ApiKeyOrmEntity {
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

    @ManyToOne(() => UserOrmEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: UserOrmEntity;

    @Column({ default: true })
    enabled!: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}