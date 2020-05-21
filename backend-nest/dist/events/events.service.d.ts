import { UserEvent } from '../entities/user-event.entity';
import { User } from '../entities/user.entity';
import { Organization } from '../entities/organization.entity';
import { Repository } from 'typeorm';
import { CreateEventsDto } from '../events/dtos/create-events.dto';
import { CreateEventUserDto } from './dtos/create-event-user.dto';
export declare class EventsService {
    private readonly userEventRepository;
    private readonly userRepository;
    private readonly organizationRepository;
    constructor(userEventRepository: Repository<UserEvent>, userRepository: Repository<User>, organizationRepository: Repository<Organization>);
    create(userEventDto: CreateEventsDto, organizationId: number): Promise<UserEvent>;
    list(organization: number): Promise<UserEvent[]>;
    adminList(organization: number): Promise<UserEvent[]>;
    createEventUser(createEventUserDto: CreateEventUserDto): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteEventUser(createEventUserDto: CreateEventUserDto): Promise<{
        success: boolean;
        message: string;
    }>;
}
