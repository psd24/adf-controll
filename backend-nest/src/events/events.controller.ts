import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { EventsService } from './events.service';
import { UserEvent } from '../entities/user-event.entity';
import { CreateEventsDto } from '../events/dtos/create-events.dto';
import { ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateEventUserDto } from './dtos/create-event-user.dto';

@ApiTags('Authentication')
@Controller('events')
export class EventsController {

    constructor(private authService: EventsService) {}  

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: UserEvent })
    @Post('create')
    async register(@Body() registerDto: CreateEventsDto): Promise<UserEvent> {
        console.log(registerDto)
        return this.authService.create(registerDto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('list')
    async list(@Request() req) {
        return this.authService.list(req.user.organization.id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('create/user-event')
    async createEventUser(@Body() createEventUserDto: CreateEventUserDto) {
        return this.authService.createEventUser(createEventUserDto);
    }
}
