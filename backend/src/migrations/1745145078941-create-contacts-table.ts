import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateContactsTable1745145078941 implements MigrationInterface {
    name = 'CreateContactsTable1745145078941'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contacts" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "email" character varying(100) NOT NULL, "message" character varying(1000), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "contacts"`);
    }

}
