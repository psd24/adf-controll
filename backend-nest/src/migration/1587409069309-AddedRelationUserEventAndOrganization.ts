import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedRelationUserEventAndOrganization1587409069309 implements MigrationInterface {
    name = 'AddedRelationUserEventAndOrganization1587409069309'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `event` ADD `organizationId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `event` ADD CONSTRAINT `FK_4db6d1ac45a58cb20e01ea9699c` FOREIGN KEY (`organizationId`) REFERENCES `organization`(`ID_Organization`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `event` DROP FOREIGN KEY `FK_4db6d1ac45a58cb20e01ea9699c`", undefined);
        await queryRunner.query("ALTER TABLE `event` DROP COLUMN `organizationId`", undefined);
    }

}
