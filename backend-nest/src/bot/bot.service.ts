/* eslint-disable @typescript-eslint/camelcase */
import {
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import TelegramBot = require('node-telegram-bot-api');
import { CameraService } from 'src/camera/camera.service';
import { Camera } from 'src/entities/camera.entity';
import request = require('request');
import fs = require('fs');
import { AppConfig } from '../app.config.template';
import { async } from 'rxjs/internal/scheduler/async';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { getuid } from 'process';
import { User } from 'src/entities/user.entity';
import { use } from 'passport';
import { Repository, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { botAuthorizingStatus } from 'src/const/statusType';

@Injectable()
export class BotService implements OnModuleInit {
  private userSteps;
  private username;
  private password;
  private userToken;

  constructor(
    private cameraService: CameraService,
    private authService: AuthService,
    private userService: UsersService,
  ) {
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
    return cameras.map((c: Camera) => {
      // eslint-disable-next-line @typescript-eslint/camelcase
      return { text: c.name, callback_data: c.id };
    });
  }

  async getImageUrl(id) {
    return await this.cameraService.getCameraId(id);
  }
  chunkArrayInGroups = async (arr, size) => {
    const myArray = [];
    for (let i = 0; i < arr.length; i += size) {
      await myArray.push(arr.slice(i, i + size));
    }
    return myArray;
  };

  async getBotMessage() {
    process.env.NTBA_FIX_319 = '1';
    const token = AppConfig.telegramToken;
    const bot = new TelegramBot(token, { polling: true });

    bot.on('callback_query', async callbackQuery => {
      const message = callbackQuery.message;

      const category = callbackQuery.data;
      const camera = await this.getImageUrl(category);
      request(camera.url).pipe(
        fs.createWriteStream('test1.png').on('close', () => {
          fs.readFile('test1.png', async (err, data) => {
            if (err) {
              console.log('err', err);
            }
            bot.sendPhoto(message.chat.id, data, {
              reply_markup: {
                inline_keyboard: await this.chunkArrayInGroups(
                  await this.getCamera(),
                  3,
                ),
                one_time_keyboard: true,
                remove_keyboard: true,
                force_reply: true,
              },
            });
          });
        }),
      );
    });

    bot.onText(/\/*/, async msg => {
      if (msg.text === '/start') {
        this.userSteps.set(msg.chat.id, 'username');
        const txt = '<b>Please enter username</b> :';
        bot.sendMessage(msg.chat.id, txt, {
          parse_mode: 'HTML',
        });
        return false;
      } else if (msg.text === '/cameralist') {
        const isActive = await this.isActiveUser(msg.chat.id);
        if (isActive) {
          const urlList = await this.chunkArrayInGroups(
            await this.getCamera(),
            3,
          );
          bot
            .sendMessage(msg.chat.id, 'Camera List', {
              // eslint-disable-next-line @typescript-eslint/camelcase
              reply_markup: {
                // eslint-disable-next-line @typescript-eslint/camelcase
                inline_keyboard: urlList,
                one_time_keyboard: true,
                remove_keyboard: true,
                force_reply: true,
              },
            })
            .catch(err => console.log('err====', err));
        } else {
          bot.sendMessage(
            msg.chat.id,
            '<b>Hello, you were not authorized to use me.</b>',
            {
              parse_mode: 'HTML',
            },
          );
        }
      } else {
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

  checkLogin = async (chatid: number) => {
    console.log(this.username.get(chatid));
    console.log(this.password.get(chatid));

    const user = await this.authService.validateUser(
      this.username.get(chatid),
      this.password.get(chatid),
    );

    if (!user) {
      return 'Your email or password does not exist';
    }

    await this.authService.login(user);
    const loginUser: User = await this.userService.findByEmail(
      this.username.get(chatid),
    );

    loginUser.authorizeConnection = botAuthorizingStatus.WAITING.toString();
    loginUser.chatId = chatid;

    await this.userService.saveTelegramUser(loginUser);

    return 'Waiting for authorization so you can use me';
  };

  isActiveUser = async (chatId: number) => {
    const isActiveUser = await this.userService.findByChatId(chatId);

    return isActiveUser
      ? isActiveUser.authorizeConnection.toLocaleLowerCase() ===
          botAuthorizingStatus.APPROVED.toString().toLocaleLowerCase()
      : false;
  };
}
