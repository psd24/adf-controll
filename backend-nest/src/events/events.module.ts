import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEvent } from '../entities/user-event.entity';

@Module({
  providers: [EventsService],
  imports: [
    TypeOrmModule.forFeature([UserEvent])
  ],
  controllers: [EventsController]
})
export class EventsModule {}
