import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedCameraStateLonLat1589045823088 implements MigrationInterface {
    name = 'AddedCameraStateLonLat1589045823088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `camera` ADD `lat` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `camera` ADD `lon` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `camera` ADD `state` int NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `camera` DROP COLUMN `state`", undefined);
        await queryRunner.query("ALTER TABLE `camera` DROP COLUMN `lon`", undefined);
        await queryRunner.query("ALTER TABLE `camera` DROP COLUMN `lat`", undefined);
    }

}
