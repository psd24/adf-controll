import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCameraType1587317557728 implements MigrationInterface {
    name = 'AddCameraType1587317557728'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `camera` CHANGE `type` `cameraTypeId` varchar(255) NOT NULL", undefined);
        await queryRunner.query("CREATE TABLE `camera-type` (`ID_Camera_Type` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `type` varchar(255) NOT NULL, PRIMARY KEY (`ID_Camera_Type`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `camera` DROP COLUMN `cameraTypeId`", undefined);
        await queryRunner.query("ALTER TABLE `camera` ADD `cameraTypeId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `camera` ADD CONSTRAINT `FK_89410c13b7608ce4416844da1a1` FOREIGN KEY (`cameraTypeId`) REFERENCES `camera-type`(`ID_Camera_Type`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `camera` DROP FOREIGN KEY `FK_89410c13b7608ce4416844da1a1`", undefined);
        await queryRunner.query("ALTER TABLE `camera` DROP COLUMN `cameraTypeId`", undefined);
        await queryRunner.query("ALTER TABLE `camera` ADD `cameraTypeId` varchar(255) NOT NULL", undefined);
        await queryRunner.query("DROP TABLE `camera-type`", undefined);
        await queryRunner.query("ALTER TABLE `camera` CHANGE `cameraTypeId` `type` varchar(255) NOT NULL", undefined);
    }

}
