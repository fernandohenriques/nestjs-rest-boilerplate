import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserRefactoringDocument1583363560535 implements MigrationInterface {
  name = 'UserRefactoringDocument1583363560535';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "User" ADD "typeDocument" character varying`, undefined);
    await queryRunner.query(`ALTER TABLE "User" ADD "document" character varying`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "typeDocument"`, undefined);
    await queryRunner.query(`ALTER TABLE "User" ADD "cpf" character varying`, undefined);
  }
}
