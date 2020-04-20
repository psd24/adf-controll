import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEvent } from '../entities/user-event.entity';
import { User } from '../entities/user.entity';
import { Repository, getConnection } from 'typeorm';
import { CreateEventsDto } from '../events/dtos/create-events.dto';
import { CreateEventUserDto } from './dtos/create-event-user.dto';

@Injectable()
export class EventsService {

    constructor(
        @InjectRepository(UserEvent)
        private readonly userEventRepository: Repository<UserEvent>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
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

    async list(organizationId:number){
        return await this.userEventRepository.find({
            where: {
                organizationId
            }
        })
    }

    async createEventUser(createEventUserDto: CreateEventUserDto){
        try {
            await getConnection()
            .createQueryBuilder()
            .insert()
            .into('event_users_user')
            .values([
                { eventId: createEventUserDto.eventId, userIDUser: createEventUserDto.userIDUser },
            ])
            .execute();
            return ({success: true, message: 'Insert successfully!'})
        } catch (err) {
            return ({success: false, message: 'Failed!'});
        }
    }
}
