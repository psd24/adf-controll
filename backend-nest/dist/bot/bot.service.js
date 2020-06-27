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
const app_config_template_1 = require("../app.config.template");
const auth_service_1 = require("../auth/auth.service");
const users_service_1 = require("../users/users.service");
const user_entity_1 = require("../entities/user.entity");
const statusType_1 = require("../const/statusType");
let BotService = class BotService {
    constructor(cameraService, authService, userService) {
        this.cameraService = cameraService;
        this.authService = authService;
        this.userService = userService;
        this.chunkArrayInGroups = async (arr, size) => {
            const myArray = [];
            for (let i = 0; i < arr.length; i += size) {
                await myArray.push(arr.slice(i, i + size));
            }
            return myArray;
        };
        this.checkLogin = async (chatid) => {
            console.log(this.username.get(chatid));
            console.log(this.password.get(chatid));
            const user = await this.authService.validateUser(this.username.get(chatid), this.password.get(chatid));
            if (!user) {
                return 'Your email or password does not exist';
            }
            await this.authService.login(user);
            const loginUser = await this.userService.findByEmail(this.username.get(chatid));
            loginUser.authorizeConnection = statusType_1.botAuthorizingStatus.WAITING.toString();
            loginUser.chatId = chatid;
            const test = await this.userService.saveTelegramUser(loginUser);
            return 'Waiting for authorization so you can use me';
        };
        this.isActiveUser = async (chatId) => {
            const isActiveUser = await this.userService.findByChatId(chatId);
            return isActiveUser
                ? isActiveUser.authorizeConnection ===
                    statusType_1.botAuthorizingStatus.APPROVED.toString()
                : false;
        };
        this.userSteps = new Map();
        this.username = new Map();
        this.password = new Map();
        this.userToken = new Map();
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
        const token = app_config_template_1.AppConfig.telegramToken;
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
        bot.onText(/\/*/, async (msg) => {
            if (msg.text === '/start') {
                this.userSteps.set(msg.chat.id, 'username');
                const txt = '<b>Please enter username</b> :';
                bot.sendMessage(msg.chat.id, txt, {
                    parse_mode: 'HTML',
                });
                return false;
            }
            else if (msg.text === '/cameralist') {
                const isActive = await this.isActiveUser(msg.chat.id);
                if (isActive) {
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
                }
                else {
                    bot.sendMessage(msg.chat.id, '<b>Hello, you were not authorized to use me.</b>', {
                        parse_mode: 'HTML',
                    });
                }
            }
            else {
                const chatId = msg.chat.id;
                const previosStep = this.userSteps.get(chatId);
                switch (previosStep) {
                    case 'username':
                        this.username.set(chatId, msg.text);
                        this.userSteps.set(chatId, 'password');
                        const txt = '<b>Please enter Password</b> :';
                        bot.sendMessage(msg.chat.id, txt, {
                            parse_mode: 'HTML',
                        });
                        break;
                    case 'password':
                        this.password.set(chatId, msg.text);
                        this.userSteps.set(chatId, 'password');
                        const loginValidateMsg = await this.checkLogin(chatId);
                        bot.sendMessage(msg.chat.id, loginValidateMsg, {
                            parse_mode: 'HTML',
                        });
                        this.userSteps.delete(chatId);
                        break;
                }
            }
        });
    }
};
BotService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [camera_service_1.CameraService,
        auth_service_1.AuthService,
        users_service_1.UsersService])
], BotService);
exports.BotService = BotService;
//# sourceMappingURL=bot.service.js.map