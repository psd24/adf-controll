import {Injectable, BadRequestException, Inject, forwardRef} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository, getConnection } from 'typeorm';
import { RegisterUserDto } from './dtos/register-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { Organization } from 'src/entities/organization.entity';
import { Role } from 'src/entities/role.entity';
import {BotService} from "../bot/bot.service";
import { Pagination, PaginationOptionsInterface } from './../paginate';
import * as nodemailer from 'nodemailer';
import { AppConfig } from '../app.config';
import * as Email from 'email-templates'

@Injectable()
export class UsersService {
    private readonly users: User[];

    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Role)
        private readonly rolesRepository: Repository<Role>,
        @InjectRepository(Organization)
        private readonly organizationsRepository: Repository<Organization>,
        @Inject(forwardRef(() => BotService))
        private botService:BotService
    ) {}


  
    
  async  sendMail(id:number) {
        
        const user:User =await this.findById(id)
    
        
        const transporter = nodemailer.createTransport({
            service:AppConfig.emailService,
            auth:{
                user:AppConfig.emailUsername,
                pass:AppConfig.emailPassword
            }
            }
        );

      const email = new Email({
          message: undefined,
          transport: transporter,
          send: true,
          preview: false,
          views: {
              root: `src/emails`,
          }

      })
      
      email.send({
          template:'hello',
          message: {
              from : AppConfig.email,
              to : user.email,

          },
          locals: {
              name: user.name,
              username: user.email,
              password: user.sendPassword,
              subject: AppConfig.emailSubject
          }
      }).then(e => {
          return "Email sucessfully Sent."
      }).catch((err => console.log('err',err)))

        
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({
            relations: ['role', 'organization'],
            where: {
                email,
            },
        });
    }
    
    async findById(id:number):Promise<User | undefined>{
        return this.usersRepository.findOne({
            where:{
                id
            }
        })
    }

    async register(userDto: RegisterUserDto): Promise<User> {
        const user = await this.findByEmail(userDto.email);
        /*if (user) {
            throw new BadRequestException('User already registered.');
        }*/

        const newUser = new User();
        newUser.email = userDto.email;
        newUser.name = userDto.name;
        newUser.code = userDto.code;
        newUser.refresh_camera =  userDto.refresh_camera;
        newUser.password = userDto.password;
        newUser.sendPassword = userDto.password

        newUser.role = await this.rolesRepository.findOne({ id: userDto.role });
        if (!newUser.role) {
            throw new BadRequestException('Invalid role id.');
        }

        newUser.organization = await this.organizationsRepository.findOne({
            id: userDto.organization,
        });
        if (!newUser.organization) {
            throw new BadRequestException('Invalid organization id.');
        }
        return this.usersRepository.save(newUser);
    }
    
    async update(updateUserDto: UpdateUserDto) {
        // return await getConnection().createQueryBuilder().update(User).set(user).where("id = :id", { id: user.id }).execute();
        const user = await this.findByEmail(updateUserDto.email);
        const newUserUpdate = new User();
        newUserUpdate.id = updateUserDto.id;
        newUserUpdate.email = updateUserDto.email;
        newUserUpdate.name = updateUserDto.name;
        newUserUpdate.code = updateUserDto.code;
        newUserUpdate.authorizeConnection= updateUserDto.authorizeConnection
        newUserUpdate.chatId = user.chatId
        newUserUpdate.sendPassword = user.password
        newUserUpdate.refresh_camera = updateUserDto.refresh_camera;
        if(updateUserDto.password) {
            newUserUpdate.password = (!updateUserDto.password) ? user.password : updateUserDto.password;
        }
        newUserUpdate.role = await this.rolesRepository.findOne({ id: updateUserDto.role });
        if (!newUserUpdate.role) {
            throw new BadRequestException('Invalid role id.');
        }

        newUserUpdate.organization = await this.organizationsRepository.findOne({
            id: updateUserDto.organization,
        });
        if (!newUserUpdate.organization) {
            throw new BadRequestException('Invalid organization id.');
        }

        this.botService.getBotMessage(true, updateUserDto.authorizeConnection, user.chatId)

        return this.usersRepository.save(newUserUpdate);
    }

    async saveTelegramUser(user: User) {
        return this.usersRepository.save(user);
    }

    async findByChatId(chatId: number) {
        return this.usersRepository.findOne({
            where: [{ chatId: chatId }],
        });
    }

    async resetPassword(resetPasswordDto: ResetPasswordDto) {
        // return await getConnection().createQueryBuilder().update(User).set(user).where("id = :id", { id: user.id }).execute();
        const newUserUpdate = new User();
        newUserUpdate.id = resetPasswordDto.id;
        newUserUpdate.password = resetPasswordDto.password;

        return this.usersRepository.save(newUserUpdate)
    }

    async delete(user: User) {
        return this.usersRepository.delete(user);
    }
    
    async getUserList(
        options: PaginationOptionsInterface,
    ): Promise<Pagination<User>> {
        const [results, total] = await this.usersRepository.findAndCount({
            take: options.limit,
            skip: options.page*options.limit,
        });

        // TODO add more tests for paginate

        return new Pagination<User>({
            results,
            total,
        });
    }



    async getUser(_id: number) {
        return this.usersRepository.findOne({
            where: [{ "id": _id }],
            relations: ['role', 'organization'],
        });
    }

    async addRoles(roleNames: string[]): Promise<Role[]> {
        return this.rolesRepository.save(roleNames.map(r => new Role(r)));
    }

    async addOrganizations(
        organizationNames: string[],
    ): Promise<Organization[]> {
        return this.organizationsRepository.save(
            organizationNames.map(o => new Organization(o)),
        );
    }

    async roleCount(): Promise<number> {
        return this.rolesRepository.count();
    }

    async organizationsCount(): Promise<number> {
        return this.organizationsRepository.count();
    }

    async usersCount(): Promise<number> {
        return this.usersRepository.count();
    }
}
