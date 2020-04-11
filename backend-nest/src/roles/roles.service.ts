import { Injectable, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { RolesDto } from './dtos/roles.dto';

@Injectable()
export class RolesService {

    constructor(
        @InjectRepository(Role)
        private readonly rolesRepository: Repository<Role>,
    ) { }

    async getRoles() {
        return this.rolesRepository.find();
    }

    async createRole(roleDto: RolesDto): Promise<Role> {
        return this.rolesRepository.save(roleDto);
      }
}
