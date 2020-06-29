import {forwardRef, Module} from '@nestjs/common';
import { BotService } from './bot.service';
import { CameraModule } from 'src/camera/camera.module';
import {UsersModule} from "../users/users.module";
import {AuthService} from "../auth/auth.service";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [CameraModule,UsersModule,forwardRef(() =>AuthModule)],
  providers: [BotService],
  exports: [BotService]
})
export class BotModule {}
