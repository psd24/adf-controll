import {MigrationInterface, QueryRunner} from "typeorm";

export class AddEvent1593527461206 implements MigrationInterface {
    name = 'AddEvent1593527461206'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `authorizeConnection` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `chatId` int NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `chatId`", undefined);
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `authorizeConnection`", undefined);
    }

}
