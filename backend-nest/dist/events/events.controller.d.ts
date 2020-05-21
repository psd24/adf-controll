import { EventsService } from './events.service';
import { UserEvent } from '../entities/user-event.entity';
import { CreateEventsDto } from '../events/dtos/create-events.dto';
import { CreateEventUserDto } from './dtos/create-event-user.dto';
export declare class EventsController {
    private authService;
    constructor(authService: EventsService);
    register(registerDto: CreateEventsDto, req: any): Promise<UserEvent>;
    list(req: any): Promise<UserEvent[]>;
    adminlist(params: any): Promise<UserEvent[]>;
    createEventUser(createEventUserDto: CreateEventUserDto): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteEventUser(createEventUserDto: CreateEventUserDto): Promise<{
        success: boolean;
        message: string;
    }>;
}
