import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { CameraModule } from 'src/camera/camera.module';

@Module({
  imports: [CameraModule],
  exports: [BotService],
})
export class BotModule {}
