import {MigrationInterface, QueryRunner} from "typeorm";

export class BotStep1593619203261 implements MigrationInterface {
    name = 'BotStep1593619203261'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `botDetail` (`Telegram_ID` int NOT NULL AUTO_INCREMENT, `chatId` int NOT NULL, `userStep` varchar(255) NOT NULL, `telegramUsername` varchar(255) NOT NULL, `telegramPassword` varchar(255) NOT NULL, PRIMARY KEY (`Telegram_ID`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `botDetail`", undefined);
    }

}
