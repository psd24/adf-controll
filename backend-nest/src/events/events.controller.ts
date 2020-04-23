import { Controller, Post, Body, UseGuards, Request, Delete, Get } from '@nestjs/common';
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
    async register(@Body() registerDto: CreateEventsDto, @Request() req): Promise<UserEvent> {
        return this.authService.create(registerDto, req.user.organization.id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('list')
    async list(@Request() req) {
        return this.authService.list(req.user.organization.id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('user-event')
    async createEventUser(@Body() createEventUserDto: CreateEventUserDto) {
        return this.authService.createEventUser(createEventUserDto);
    }
    
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete('user-event')
    async deleteEventUser(@Body() createEventUserDto: CreateEventUserDto) {
        return this.authService.deleteEventUser(createEventUserDto);
    }
}
