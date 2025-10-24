import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1740333480790 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          CREATE TABLE "users" (
            "id" SERIAL NOT NULL,
            "email" VARCHAR NOT NULL,
            "password" VARCHAR NOT NULL,
            "enabled" BOOLEAN NOT NULL DEFAULT true,
            "created_at" TIMESTAMP NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
            CONSTRAINT "PK_users_id" PRIMARY KEY ("id"),
            CONSTRAINT "UQ_users_email" UNIQUE ("email")
          )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}