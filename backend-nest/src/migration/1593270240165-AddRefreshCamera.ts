import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRefreshCamera1593270240165 implements MigrationInterface {
    name = 'AddRefreshCamera1593270240165'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `refresh_camera` int NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `refresh_camera`", undefined);
    }

}
