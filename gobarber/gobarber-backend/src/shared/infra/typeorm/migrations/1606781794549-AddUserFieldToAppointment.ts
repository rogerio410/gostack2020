import { MigrationInterface, QueryRunner } from 'typeorm'

export class AddUserFieldToAppointment1606781794549
  implements MigrationInterface {
  name = 'AddUserFieldToAppointment1606781794549'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "appointment" ADD "userId" uuid`)
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP CONSTRAINT "FK_f013bda65c235464178ac025925"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment" ALTER COLUMN "providerId" DROP NOT NULL`
    )
    await queryRunner.query(
      `COMMENT ON COLUMN "appointment"."providerId" IS NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_f013bda65c235464178ac025925" FOREIGN KEY ("providerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_2a990a304a43ccc7415bf7e3a99" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP CONSTRAINT "FK_2a990a304a43ccc7415bf7e3a99"`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment" DROP CONSTRAINT "FK_f013bda65c235464178ac025925"`
    )
    await queryRunner.query(
      `COMMENT ON COLUMN "appointment"."providerId" IS NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment" ALTER COLUMN "providerId" SET NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE "appointment" ADD CONSTRAINT "FK_f013bda65c235464178ac025925" FOREIGN KEY ("providerId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    )
    await queryRunner.query(`ALTER TABLE "appointment" DROP COLUMN "userId"`)
  }
}
