import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserRefactoringBirthDate1583338446606 implements MigrationInterface {
  name = 'UserRefactoringBirthDate1583338446606';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "birthDate"`, undefined);
    await queryRunner.query(`ALTER TABLE "User" ADD "birthDate" date`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "birthDate"`, undefined);
    await queryRunner.query(`ALTER TABLE "User" ADD "birthDate" TIMESTAMP`, undefined);
  }
}
