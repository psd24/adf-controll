import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCameraToUser1594631191715 implements MigrationInterface {
    name = 'AddCameraToUser1594631191715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `camera` ADD `mainUserId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `camera` ADD CONSTRAINT `FK_94691fba2cc8e683a5ffd4fd689` FOREIGN KEY (`mainUserId`) REFERENCES `user`(`ID_User`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `camera` DROP FOREIGN KEY `FK_94691fba2cc8e683a5ffd4fd689`", undefined);
        await queryRunner.query("ALTER TABLE `camera` DROP COLUMN `mainUserId`", undefined);
    }

}
