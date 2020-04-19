import {MigrationInterface, QueryRunner} from "typeorm";

export class AddOrganizationAndCamera1587254625706 implements MigrationInterface {
    name = 'AddOrganizationAndCamera1587254625706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `vehicle` (`ID_Vehicle` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `type` varchar(255) NOT NULL, `code` varchar(255) NOT NULL, `organizationId` int NULL, PRIMARY KEY (`ID_Vehicle`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `camera` (`ID_Camera` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `type` varchar(255) NOT NULL, `ip` varchar(255) NOT NULL, `port` varchar(255) NOT NULL, `user` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `organizationId` int NULL, PRIMARY KEY (`ID_Camera`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `vehicle` ADD CONSTRAINT `FK_dd963173bbe67e11aadc6615543` FOREIGN KEY (`organizationId`) REFERENCES `organization`(`ID_Organization`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `camera` ADD CONSTRAINT `FK_d9e186b5b582af8a0de9eaaa742` FOREIGN KEY (`organizationId`) REFERENCES `organization`(`ID_Organization`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `camera` DROP FOREIGN KEY `FK_d9e186b5b582af8a0de9eaaa742`", undefined);
        await queryRunner.query("ALTER TABLE `vehicle` DROP FOREIGN KEY `FK_dd963173bbe67e11aadc6615543`", undefined);
        await queryRunner.query("DROP TABLE `camera`", undefined);
        await queryRunner.query("DROP TABLE `vehicle`", undefined);
    }

}
