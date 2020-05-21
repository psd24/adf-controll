"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const TelegramBot = require("node-telegram-bot-api");
const camera_service_1 = require("../camera/camera.service");
const camera_entity_1 = require("../entities/camera.entity");
const request = require("request");
const fs = require("fs");
const app_config_1 = require("../app.config");
let BotService = class BotService {
    constructor(cameraService) {
        this.cameraService = cameraService;
        this.chunkArrayInGroups = async (arr, size) => {
            const myArray = [];
            for (let i = 0; i < arr.length; i += size) {
                await myArray.push(arr.slice(i, i + size));
            }
            return myArray;
        };
    }
    onModuleInit() {
        this.getBotMessage();
    }
    async getCamera() {
        const cameras = await this.cameraService.getCamera();
        return cameras.map((c) => {
            return { text: c.name, callback_data: c.id };
        });
    }
    async getImageUrl(id) {
        return await this.cameraService.getCameraId(id);
    }
    async getBotMessage() {
        process.env.NTBA_FIX_319 = '1';
        const token = app_config_1.AppConfig.telegramToken;
        const bot = new TelegramBot(token, { polling: true });
        bot.on('callback_query', async (callbackQuery) => {
            const message = callbackQuery.message;
            const category = callbackQuery.data;
            const camera = await this.getImageUrl(category);
            request(camera.url).pipe(fs.createWriteStream('test1.png').on('close', () => {
                fs.readFile('test1.png', async (err, data) => {
                    if (err) {
                        console.log('err', err);
                    }
                    bot.sendPhoto(message.chat.id, data, {
                        reply_markup: {
                            inline_keyboard: await this.chunkArrayInGroups(await this.getCamera(), 3),
                            one_time_keyboard: true,
                            remove_keyboard: true,
                            force_reply: true,
                        },
                    });
                });
            }));
        });
        bot.onText(/\/cameralist/, async (msg) => {
            const urlList = await this.chunkArrayInGroups(await this.getCamera(), 3);
            bot
                .sendMessage(msg.chat.id, 'Camera List', {
                reply_markup: {
                    inline_keyboard: urlList,
                    one_time_keyboard: true,
                    remove_keyboard: true,
                    force_reply: true,
                },
            })
                .catch(err => console.log('err====', err));
        });
    }
};
BotService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [camera_service_1.CameraService])
], BotService);
exports.BotService = BotService;
//# sourceMappingURL=bot.service.js.map