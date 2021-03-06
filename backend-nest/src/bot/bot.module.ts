import {forwardRef, Module} from '@nestjs/common';
import { BotService } from './bot.service';
import { CameraModule } from 'src/camera/camera.module';
import {UsersModule} from "../users/users.module";
import {AuthService} from "../auth/auth.service";
import {AuthModule} from "../auth/auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {BotDetail} from "../entities/bot.entity";
import {BotgroupModule} from "../botGroup/botgroup.module";

@Module({
  imports: [TypeOrmModule.forFeature([BotDetail]), CameraModule, forwardRef(()=>AuthModule),forwardRef(() =>UsersModule),forwardRef(() => BotgroupModule)],
  providers: [BotService],
  exports: [BotService]
})
export class BotModule {}
