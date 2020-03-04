import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserRefactoring1583333829319 implements MigrationInterface {
  name = 'UserRefactoring1583333829319';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "User" ADD "birthDate" TIMESTAMP`, undefined);
    await queryRunner.query(`ALTER TABLE "User" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
    await queryRunner.query(`ALTER TABLE "User" ADD "updatedAt" TIMESTAMP DEFAULT now()`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "updatedAt"`, undefined);
    await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "createdAt"`, undefined);
    await queryRunner.query(`ALTER TABLE "User" DROP COLUMN "birthDate"`, undefined);
  }
}
