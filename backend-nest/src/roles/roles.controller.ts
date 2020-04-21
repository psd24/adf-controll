import { Controller, Get, UseGuards, Body, Post, Delete, Param, Put } from '@nestjs/common';
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
    @Get(':id')
    getRole(@Param() params) {
        return this.service.getRole(params.id);
    }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: Role })
    @Post()
    post(@Body() roleDto: RolesDto) {
        return this.service.createRole(roleDto)
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param() params) {
        return this.service.delete(params.id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put()
    update(@Body() role: Role) {
        return this.service.update(role);
    }


}
