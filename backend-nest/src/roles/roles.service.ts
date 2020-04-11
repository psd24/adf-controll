import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';

@Injectable()
export class RolesService {

    constructor(
        @InjectRepository(Role)
        private readonly rolesRepository: Repository<Role>,
    ) { }

    async getRoles() {
        return this.rolesRepository.find();
    }
}
