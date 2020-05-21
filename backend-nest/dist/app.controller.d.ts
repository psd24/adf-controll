import { BotService } from "./bot/bot.service";
export declare class AppController {
    private botService;
    constructor(botService: BotService);
    hello(): Promise<void>;
}
