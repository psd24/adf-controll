import {MigrationInterface, QueryRunner} from "typeorm";

export class BotGroup1593665413915 implements MigrationInterface {
    name = 'BotGroup1593665413915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `BotGroup` (`BotGroup_ID` int NOT NULL AUTO_INCREMENT, `chatId` int NOT NULL, `userStep` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `description` varchar(255) NOT NULL, `authorizeConnection` varchar(255) NOT NULL, PRIMARY KEY (`BotGroup_ID`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `BotGroup`", undefined);
    }

}
