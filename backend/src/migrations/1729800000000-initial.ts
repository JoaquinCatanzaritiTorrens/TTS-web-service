import { MigrationInterface, QueryRunner } from "typeorm";
import { createQueryFileExecutor } from '../__shared__/__helpers__/migration/migration-helpers';

export class Initial1729800000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const queryFile = createQueryFileExecutor(queryRunner);

        await queryFile("./1729800000000-initial/create_users_table.sql");
        await queryFile("./1729800000000-initial/create_contacts_table.sql");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "contacts"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
