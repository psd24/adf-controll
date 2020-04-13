import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEvent } from '../entities/user-event.entity';
import { Repository } from 'typeorm';
import { CreateEventsDto } from '../events/dtos/create-events.dto';

@Injectable()
export class EventsService {

    constructor(
        @InjectRepository(UserEvent)
        private readonly userEventRepository: Repository<UserEvent>,
    ){}

    async create(userEventDto: CreateEventsDto) : Promise<UserEvent>{
        const newUserEvent = new UserEvent()
        newUserEvent.name = userEventDto.name;
        newUserEvent.description = userEventDto.description;
        newUserEvent.population = userEventDto.population;
        newUserEvent.dateInit = userEventDto.dateInit;
        newUserEvent.dateEnd = userEventDto.dateEnd;
        return await this.userEventRepository.save(newUserEvent);
    }
}
