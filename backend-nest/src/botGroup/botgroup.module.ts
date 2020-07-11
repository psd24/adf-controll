
import {TypeOrmModule} from "@nestjs/typeorm";
import {Botgroup} from "../entities/botgroup.entity";
import {BotgroupService} from "./botgroup.service";
import {forwardRef, Module} from "@nestjs/common";
import {BotModule} from "../bot/bot.module";

@Module({
    imports: [TypeOrmModule.forFeature([Botgroup]),forwardRef(() => BotModule)],
    providers: [BotgroupService],
    exports: [BotgroupService]
})
export class BotgroupModule {}
