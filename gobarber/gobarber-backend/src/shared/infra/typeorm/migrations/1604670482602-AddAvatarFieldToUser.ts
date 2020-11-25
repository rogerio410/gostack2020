import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAvatarFieldToUser1604670482602 implements MigrationInterface {
    name = 'AddAvatarFieldToUser1604670482602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "avatar" character varying`);
        // await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_f013bda65c235464178ac025925"`);
        // await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "providerId"`);
        // await queryRunner.query(`ALTER TABLE "appointment" ADD "providerId" character varying`);
        // await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_f013bda65c235464178ac025925" FOREIGN KEY ("providerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_f013bda65c235464178ac025925"`);
        // await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "providerId"`);
        // await queryRunner.query(`ALTER TABLE "appointment" ADD "providerId" uuid NOT NULL`);
        // await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_f013bda65c235464178ac025925" FOREIGN KEY ("providerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
    }

}
