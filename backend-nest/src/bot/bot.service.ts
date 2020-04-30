/* eslint-disable @typescript-eslint/camelcase */
import { Injectable, OnModuleInit } from '@nestjs/common';
import TelegramBot = require('node-telegram-bot-api');
import { CameraService } from 'src/camera/camera.service';
import { Camera } from 'src/entities/camera.entity';
import request = require('request');
import fs = require('fs');
@Injectable()
export class BotService implements OnModuleInit {
  constructor(private cameraService: CameraService) {}

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
    const token = '8587077';
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

    bot.onText(/\/cameralist/, async msg => {
      const urlList = await this.chunkArrayInGroups(await this.getCamera(), 3);

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
    });
  }
}
