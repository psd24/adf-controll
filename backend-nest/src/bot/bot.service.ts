/* eslint-disable @typescript-eslint/camelcase */
import {
  forwardRef,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import TelegramBot = require('node-telegram-bot-api');
import { CameraService } from 'src/camera/camera.service';
import { Camera } from 'src/entities/camera.entity';
import request = require('request');
import fs = require('fs');
import { AppConfig } from '../app.config';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/entities/user.entity';
import { botAuthorizingStatus } from 'src/const/statusType';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {BotDetail} from "../entities/bot.entity";
import {botStep} from "../const/userStep";
import {doc} from "prettier";
import group = doc.builders.group;
import {BotgroupService} from "../botGroup/botgroup.service";
import {Botgroup} from "../entities/botgroup.entity";

@Injectable()
export class BotService implements OnModuleInit {
  constructor(
    private cameraService: CameraService,
    private authService: AuthService,
    private userService: UsersService,
    @InjectRepository(BotDetail)
    private readonly botDetailRepository: Repository<BotDetail>,
    @Inject(forwardRef(() => BotgroupService))
    private botgroupService: BotgroupService
  ) {}
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



  async  botGroupDetail(bot:any,message:any){
    let botgroup:Botgroup = await this.botgroupService.findByChatId(message.chat.id)
    if(!botgroup){
      botgroup = new Botgroup();
      botgroup.chatId =message.chat.id
      botgroup.name = message.chat.title
      botgroup.authorizeConnection = botAuthorizingStatus.WAITING
      botgroup = await this.botgroupService.create(botgroup);
    }
    const sendMessage = "<b>Hola, estic esperant l'autorització perquè em pugueu utilitzar en aquest grup</b>";
    bot.sendMessage(message.chat.id,sendMessage, {
      parse_mode:'HTML'
    })

  }

  async getBotMessage(isSend?:boolean, status?:string, botChatId?:number) {

    process.env.NTBA_FIX_319 = '1';
    const token = AppConfig.telegramToken;
    // @ts-ignore
    const bot = new TelegramBot(token, { polling: true});


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



    if(isSend){
      let botUseMessage
      if(status.toLocaleLowerCase()===botAuthorizingStatus.APPROVED.toLocaleLowerCase().toString()){
        botUseMessage ="<b>Hola, heu estat autoritzats a utilitzar-me</b>";
      }else{
        botUseMessage ="<b>Hola, no esteu autoritzat a utilitzar-me</b>"
      }
      console.log('called.......')
      bot.sendMessage(botChatId,botUseMessage, {
        parse_mode:'HTML'
      })

    }



    bot.onText(/\/*/, async msg => {

      const isGroup = msg.chat.type ==="group" ? true :false

      if (msg.text === '/start') {

        if(isGroup){
          return this.botGroupDetail(bot,msg)
        }
        const botDetail:BotDetail = await this.findByChatId(msg.chat.id)
        botDetail.userStep = botStep.USERNAME.toString()
        this.botDetailRepository.save(botDetail)
        const txt = '<b>Introduïu el nom d usuari</b> :';
        bot.sendMessage(msg.chat.id, txt, {
          parse_mode: 'HTML',
        });
        return false;
      } else if (msg.text === '/cameralist') {
        const isActive = await this.isActiveUser(msg.chat.id, isGroup);
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
            '<b>Hola, no esteu autoritzat a utilitzar-me.</b>',
            {
              parse_mode: 'HTML',
            },
          );
        }
      } else {
        const chatId = msg.chat.id;
        const botDetail:BotDetail = await this.findByChatId(chatId)
        switch (botDetail.userStep) {
          case botStep.USERNAME.toString():
            botDetail.userStep = botStep.PASSWORD.toString()
            botDetail.telegramUsername = msg.text
            await this.botDetailRepository.save(botDetail)
            const txt = '<b>Introduïu la contrasenya</b> :';
            bot.sendMessage(chatId, txt, {
              parse_mode: 'HTML',
            });
            break;
          case botStep.PASSWORD.toString():
            botDetail.telegramPassword = msg.text
              botDetail.userStep = botStep.NONE.toString()
              await this.botDetailRepository.save(botDetail)
            const loginValidateMsg = await this.checkLogin(chatId);
            bot.sendMessage(msg.chat.id, loginValidateMsg, {
              parse_mode: 'HTML',
            });
            break;
        }
      }
    });
  }




  checkLogin = async (chatid: number) => {
  const botDetail:BotDetail = await this.findByChatId(chatid)
    console.log(botDetail)
    const user = await this.authService.validateUser(
        botDetail.telegramUsername,
        botDetail.telegramPassword
    );

    if (!user) {
      return 'El vostre correu electrònic o contrasenya no existeix';
    }

    await this.authService.login(user);
    const loginUser: User = await this.userService.findByEmail(
    botDetail.telegramUsername
    );

    loginUser.authorizeConnection = botAuthorizingStatus.WAITING.toString();
    loginUser.chatId = chatid;
    loginUser.password = botDetail.telegramPassword
    await this.userService.saveTelegramUser(loginUser);

    return 'Esperant l autorització perquè em pugueu fer servir';
  };


  findByChatId = async (chatId:number) => {

    let botDetail = await this.botDetailRepository.findOne({
      where: [{ chatId: chatId }],
    })
    if(!botDetail){
      botDetail = new BotDetail();
      botDetail.chatId = chatId;
      botDetail=  await this.botDetailRepository.save(botDetail)
    }
    return botDetail
  }

  isActiveUser = async (chatId: number, isGroup:boolean) => {

    let isActiveUser
    if(isGroup){
      isActiveUser = await this.botgroupService.findByChatId(chatId)
    }else {
      isActiveUser=   await this.userService.findByChatId(chatId);
    }

    return isActiveUser
      ? isActiveUser.authorizeConnection.toLocaleLowerCase() ===
          botAuthorizingStatus.APPROVED.toString().toLocaleLowerCase()
      : false;
  };
}
