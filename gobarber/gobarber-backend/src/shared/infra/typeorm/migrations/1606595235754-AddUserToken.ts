import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUserToken1606595235754 implements MigrationInterface {
  name = 'AddUserToken1606595235754'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_token" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, CONSTRAINT "PK_48cb6b5c20faa63157b3c1baf7f" PRIMARY KEY ("id"))`
    )
    // await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_f013bda65c235464178ac025925"`);
    // await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "providerId" DROP NOT NULL`);
    // await queryRunner.query(`COMMENT ON COLUMN "appointment"."providerId" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "user_token" ADD CONSTRAINT "FK_d37db50eecdf9b8ce4eedd2f918" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    // await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_f013bda65c235464178ac025925" FOREIGN KEY ("providerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_f013bda65c235464178ac025925"`);
    await queryRunner.query(
      `ALTER TABLE "user_token" DROP CONSTRAINT "FK_d37db50eecdf9b8ce4eedd2f918"`
    )
    // await queryRunner.query(`COMMENT ON COLUMN "appointment"."providerId" IS NULL`);
    // await queryRunner.query(`ALTER TABLE "appointment" ALTER COLUMN "providerId" SET NOT NULL`);
    // await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_f013bda65c235464178ac025925" FOREIGN KEY ("providerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    await queryRunner.query(`DROP TABLE "user_token"`)
  }
}
