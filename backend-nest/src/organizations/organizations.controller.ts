import { Controller, UseGuards, Get, Post, Body } from '@nestjs/common';
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
    @ApiOkResponse({ type: Organization })
    @Post('create')
    post(@Body() organizationDto: CreateOrganizationDto) {
        return this.organizationsService.createOrganization(organizationDto)
    }
}
