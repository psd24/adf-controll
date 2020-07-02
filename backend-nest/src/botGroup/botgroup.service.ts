import {BadRequestException, forwardRef, Inject, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Botgroup} from "../entities/botgroup.entity";
import {Repository} from "typeorm";
import {BotgroupDto} from "./dtos/botgroup.dto";
import {UpdateUserDto} from "../users/dtos/update-user.dto";
import {User} from "../entities/user.entity";
import {BotService} from "../bot/bot.service";

@Injectable()
export class BotgroupService {

    constructor(@InjectRepository(Botgroup) private botgroupRepository :Repository<Botgroup>,
                @Inject(forwardRef(() => BotService)) private botService:BotService) {
    }


    async findByChatId(chatid:number){
        return await this.botgroupRepository.findOne({
            where:[{chatId:chatid}]
        })
    }

    async create(botgroup:Botgroup) {
        return await this.botgroupRepository.save(botgroup)
    }

    async findByid(id:number){
        return await this.botgroupRepository.findOne({
            where: [{ "id": id }]
        })
    }


    async update(botgroupDto:BotgroupDto){
        const botgroup:Botgroup = await this.findByid(botgroupDto.id);
        let newBotGroup = new Botgroup();
        newBotGroup.id = botgroupDto.id
        newBotGroup.authorizeConnection = botgroupDto.authorizeConnection
        newBotGroup.name = botgroupDto.name
        newBotGroup.chatId = botgroup.chatId
        newBotGroup= await this.botgroupRepository.save(newBotGroup)
        this.botService.getBotMessage(true, botgroupDto.authorizeConnection, botgroup.chatId)
        return newBotGroup
    }
}