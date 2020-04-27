import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUrlCamera1588013403614 implements MigrationInterface {
    name = 'AddUrlCamera1588013403614'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `camera` ADD `url` varchar(255) NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `camera` DROP COLUMN `url`", undefined);
    }

}
