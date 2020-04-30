import { Controller, Get } from '@nestjs/common';
import {BotService} from "./bot/bot.service";

@Controller()
export class AppController {
  constructor(private botService: BotService) {
  }
  @Get()
  async hello() {
    return this.botService.getBotMessage()
  }
}
