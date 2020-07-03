import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatePassword1593792952335 implements MigrationInterface {
    name = 'UpdatePassword1593792952335'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `sendPassword` varchar(255) NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `sendPassword`", undefined);
    }

}
