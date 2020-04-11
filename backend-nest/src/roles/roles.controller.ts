import { Controller, Get, UseGuards, Body, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Role } from '../entities/role.entity';
import { RolesDto } from 'src/roles/dtos/roles.dto';

@ApiTags('Authentication')
@Controller('roles')
export class RolesController {

    constructor(private service: RolesService) { }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    get() {
        return this.service.getRoles();
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: Role })
    @Post()
    post(@Body() roleDto: RolesDto) {
        return this.service.createRole(roleDto)
    }
}
