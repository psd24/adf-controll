import { Controller, UseGuards, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { OrganizationsService } from './organizations.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Organization } from '../entities/organization.entity';
import { CreateOrganizationDto } from './dtos/createOrganization.dtos';

@ApiTags('Authentication')
@Controller('organizations')
export class OrganizationsController {

    constructor(private organizationsService: OrganizationsService){}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    get() {
        return this.organizationsService.getOrganizations();
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getOrganization(@Param() params) {
        return this.organizationsService.getOneOrganizations(params.id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: Organization })
    @Post()
    post(@Body() organizationDto: CreateOrganizationDto) {
        return this.organizationsService.createOrganization(organizationDto)
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put()
    update(@Body() organization: Organization) {
        return this.organizationsService.update(organization);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteUser(@Param() params) {
        return this.organizationsService.delete(params.id);
    }

}
