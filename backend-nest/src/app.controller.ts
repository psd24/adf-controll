import { Controller, Get } from '@nestjs/common';
import {BotService} from "./bot/bot.service";
import {CameraService} from "./camera/camera.service";
import {JobService} from "./jobs/job.service";

@Controller()
export class AppController {
  constructor(private botService: BotService, private jobService:JobService) {
  }
  @Get()
  async hello() {
      this.jobService.startJob()
    return this.botService.getBotMessage()
  }
}
