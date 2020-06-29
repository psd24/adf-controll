import {forwardRef, Inject, Injectable} from '@nestjs/common';
import { compare } from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { RegisterUserDto } from 'src/users/dtos/register-user.dto';
import {UpdateTelegramUserDto} from "../users/dtos/update-telegram-user.dto";
import {botAuthorizingStatus} from "../const/statusType";
import {BotService} from "../bot/bot.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
      @Inject(forwardRef(() => BotService))
      private botService: BotService
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (user && await compare(pass, user.password)) {
      return user;
    }
    return null;
  }


  async validateStatus(updateTelegramUserDto:UpdateTelegramUserDto): Promise<UpdateTelegramUserDto>{
    if(updateTelegramUserDto.status.toLocaleLowerCase() === botAuthorizingStatus.APPROVED.toString().toLocaleLowerCase() || updateTelegramUserDto.status.toLocaleLowerCase()=== botAuthorizingStatus.DENIED.toString().toLocaleLowerCase()){
      return  updateTelegramUserDto;
    }


    return null;
  }

  async validateUserById(updateTelegramUserDto:UpdateTelegramUserDto):Promise<User>{
    let user:User = await this.usersService.findById(updateTelegramUserDto.id)
    if(!user || user === undefined){
      return null
    }

    user.authorizeConnection = updateTelegramUserDto.status
    user= await this.usersService.saveTelegramUser(user)
    this.botService.getBotMessage(true, updateTelegramUserDto.status, user.chatId)
    return user



  }

  async login(user: any) {
    const payload = { id: user.id, name: user.name, email: user.email, code: user.code, refresh_camera: user.refresh_camera, role: user.role, organization: user.organization };
    return {
      accessToken: this.jwtService.sign(payload),
      refresh_camera: user.refresh_camera,
      role: user.role
    };
  }

  async register(userDto: RegisterUserDto): Promise<User> {
    return this.usersService.register(userDto);
  }
}
