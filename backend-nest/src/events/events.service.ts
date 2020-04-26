import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEvent } from '../entities/user-event.entity';
import { User } from '../entities/user.entity';
import { Organization } from '../entities/organization.entity';
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
        @InjectRepository(Organization)
        private readonly organizationRepository: Repository<Organization>,
    ){}

    async create(userEventDto: CreateEventsDto, organizationId:number) : Promise<UserEvent>{

        const newUserEvent = new UserEvent()
        newUserEvent.name = userEventDto.name;
        newUserEvent.description = userEventDto.description;
        newUserEvent.population = userEventDto.population;
        newUserEvent.dateInit = userEventDto.dateInit;
        newUserEvent.dateEnd = userEventDto.dateEnd;
        newUserEvent.organization = await this.organizationRepository.findOne({ id: organizationId });
        return await this.userEventRepository.save(newUserEvent);
    }

    async list(organization:number){
        let findList = await this.userEventRepository.find({
            relations: ["organization"],
            where:{
                organization: {
                    id:organization
                }
            }
        })
        return findList;
    }

    async adminList(organization:number){
        let findList = await this.userEventRepository.find({
            relations: ["organization"],
            where:{
                organization: {
                    id:organization
                }
            }
        })
        return findList;
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

    async deleteEventUser(createEventUserDto: CreateEventUserDto){
        try {
            await getConnection()
            .createQueryBuilder()
            .delete()
            .from('event_users_user')
            .where(
                 "eventId = :eventId", { eventId: createEventUserDto.eventId }
            )
            .andWhere(
                "userIDUser = :userIDUser", { userIDUser: createEventUserDto.userIDUser }
            )
            .execute();
            return ({success: true, message: 'Delete successfully!'})
        } catch (err) {
            return ({success: false, message: 'Failed!'});
        }
    }
}
