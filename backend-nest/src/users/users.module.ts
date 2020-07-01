import {forwardRef, Module} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from 'src/entities/organization.entity';
import { Role } from 'src/entities/role.entity';
import {BotModule} from "../bot/bot.module";

@Module({
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User, Role, Organization]),
      BotModule
  ],
  exports: [UsersService],
})
export class UsersModule {}
