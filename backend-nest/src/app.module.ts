import {Module, OnModuleInit} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SeedModule } from './seed/seed.module';
import { RolesModule } from './roles/roles.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { EventsModule } from './events/events.module';
import { CameraModule } from './camera/camera.module';

import * as ormconfig from './ormconfig';
import {BotService} from "./bot/bot.service";
import {BotModule} from "./bot/bot.module";
import {JobModule} from "./jobs/job.module";
import {JobService} from "./jobs/job.service";

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), AuthModule, UsersModule, SeedModule, RolesModule, OrganizationsModule, EventsModule, CameraModule,BotModule, JobModule],
  controllers: [AppController],
})
export class AppModule implements OnModuleInit{
  constructor(private jobService:JobService) {
  }

  onModuleInit(): any {
    this.jobService.startJob()
  }
}
