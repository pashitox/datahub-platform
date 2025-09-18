import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEmailVerification1757934549976 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users
            ADD COLUMN IF NOT EXISTS "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
            ADD COLUMN IF NOT EXISTS "emailVerificationToken" VARCHAR(255);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users
            DROP COLUMN IF EXISTS "isEmailVerified",
            DROP COLUMN IF EXISTS "emailVerificationToken";
        `);
    }

}
