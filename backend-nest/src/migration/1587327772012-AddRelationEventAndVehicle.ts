import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRelationEventAndVehicle1587327772012 implements MigrationInterface {
    name = 'AddRelationEventAndVehicle1587327772012'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `event_vehicle_vehicle` (`eventId` int NOT NULL, `vehicleIDVehicle` int NOT NULL, INDEX `IDX_abc5ef25d87a5524f20b92924b` (`eventId`), INDEX `IDX_453a90f85f5f552689b78ecabd` (`vehicleIDVehicle`), PRIMARY KEY (`eventId`, `vehicleIDVehicle`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `event_vehicle_vehicle` ADD CONSTRAINT `FK_abc5ef25d87a5524f20b92924bf` FOREIGN KEY (`eventId`) REFERENCES `event`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `event_vehicle_vehicle` ADD CONSTRAINT `FK_453a90f85f5f552689b78ecabd0` FOREIGN KEY (`vehicleIDVehicle`) REFERENCES `vehicle`(`ID_Vehicle`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `event_vehicle_vehicle` DROP FOREIGN KEY `FK_453a90f85f5f552689b78ecabd0`", undefined);
        await queryRunner.query("ALTER TABLE `event_vehicle_vehicle` DROP FOREIGN KEY `FK_abc5ef25d87a5524f20b92924bf`", undefined);
        await queryRunner.query("DROP INDEX `IDX_453a90f85f5f552689b78ecabd` ON `event_vehicle_vehicle`", undefined);
        await queryRunner.query("DROP INDEX `IDX_abc5ef25d87a5524f20b92924b` ON `event_vehicle_vehicle`", undefined);
        await queryRunner.query("DROP TABLE `event_vehicle_vehicle`", undefined);
    }

}
