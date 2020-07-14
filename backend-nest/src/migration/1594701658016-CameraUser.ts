import {MigrationInterface, QueryRunner} from "typeorm";

export class CameraUser1594701658016 implements MigrationInterface {
    name = 'CameraUser1594701658016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `camera` DROP FOREIGN KEY `FK_94691fba2cc8e683a5ffd4fd689`", undefined);
        await queryRunner.query("CREATE TABLE `CameraUser` (`ID_CameraUser` int NOT NULL AUTO_INCREMENT, `cameraId` int NULL, `userId` int NULL, PRIMARY KEY (`ID_CameraUser`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `camera` DROP COLUMN `mainUserId`", undefined);
        await queryRunner.query("ALTER TABLE `CameraUser` ADD CONSTRAINT `FK_2ca004d0ffb669283a55457cffe` FOREIGN KEY (`cameraId`) REFERENCES `camera`(`ID_Camera`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `CameraUser` ADD CONSTRAINT `FK_57fb945f599016fe2e96007b3ee` FOREIGN KEY (`userId`) REFERENCES `user`(`ID_User`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `CameraUser` DROP FOREIGN KEY `FK_57fb945f599016fe2e96007b3ee`", undefined);
        await queryRunner.query("ALTER TABLE `CameraUser` DROP FOREIGN KEY `FK_2ca004d0ffb669283a55457cffe`", undefined);
        await queryRunner.query("ALTER TABLE `camera` ADD `mainUserId` int NULL", undefined);
        await queryRunner.query("DROP TABLE `CameraUser`", undefined);
        await queryRunner.query("ALTER TABLE `camera` ADD CONSTRAINT `FK_94691fba2cc8e683a5ffd4fd689` FOREIGN KEY (`mainUserId`) REFERENCES `user`(`ID_User`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
