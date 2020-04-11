import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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
}
