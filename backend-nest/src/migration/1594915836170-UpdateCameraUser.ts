import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateCameraUser1594915836170 implements MigrationInterface {
    name = 'UpdateCameraUser1594915836170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `CameraUser` ADD `organizationId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `CameraUser` ADD `cameraTypeId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `CameraUser` ADD CONSTRAINT `FK_4df32c689a269f9a412f091e9a6` FOREIGN KEY (`organizationId`) REFERENCES `organization`(`ID_Organization`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `CameraUser` ADD CONSTRAINT `FK_db0451a3c8e470ace486516c94e` FOREIGN KEY (`cameraTypeId`) REFERENCES `camera-type`(`ID_Camera_Type`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `CameraUser` DROP FOREIGN KEY `FK_db0451a3c8e470ace486516c94e`", undefined);
        await queryRunner.query("ALTER TABLE `CameraUser` DROP FOREIGN KEY `FK_4df32c689a269f9a412f091e9a6`", undefined);
        await queryRunner.query("ALTER TABLE `CameraUser` DROP COLUMN `cameraTypeId`", undefined);
        await queryRunner.query("ALTER TABLE `CameraUser` DROP COLUMN `organizationId`", undefined);
    }

}
