import { MigrationInterface, QueryRunner } from "typeorm";
import { createQueryFileExecutor } from '../__shared__/__helpers__/migration/migration-helpers';

export class AddApiKeys1738800000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const queryFile = createQueryFileExecutor(queryRunner);
        await queryFile("./1738800000000-add-api-keys/create_api_keys_table.sql");
        await queryFile("./1738800000000-add-api-keys/create_api_key_requests_table.sql");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "api_key_requests"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "api_keys"`);
    }
}
