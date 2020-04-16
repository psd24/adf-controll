import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEvent } from '../entities/user-event.entity';
import { User } from '../entities/user.entity';

@Module({
  providers: [EventsService],
  imports: [
    TypeOrmModule.forFeature([UserEvent, User])
  ],
  controllers: [EventsController]
})
export class EventsModule {}
