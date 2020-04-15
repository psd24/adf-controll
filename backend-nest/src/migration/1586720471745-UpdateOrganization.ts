import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateOrganization1586720471745 implements MigrationInterface {
    name = 'UpdateOrganization1586720471745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `organization` ADD `code` varchar(255) NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `organization` DROP COLUMN `code`", undefined);
    }

}
