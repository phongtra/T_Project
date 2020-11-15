import {MigrationInterface, QueryRunner} from "typeorm";

export class AddDoctorId1605348655545 implements MigrationInterface {
    name = 'AddDoctorId1605348655545'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "doctorId" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "doctorId"`);
    }

}
