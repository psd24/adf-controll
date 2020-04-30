import { Module } from '@nestjs/common';
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
import { BotService } from './bot/bot.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    AuthModule,
    UsersModule,
    SeedModule,
    RolesModule,
    OrganizationsModule,
    EventsModule,
    CameraModule,
  ],
  controllers: [AppController],
  providers: [BotService],
})
export class AppModule {}
