import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from '../entities/organization.entity';
import { CreateOrganizationDto } from './dtos/createOrganization.dtos';

@Injectable()
export class OrganizationsService {

    constructor(
        @InjectRepository(Organization)
        private readonly organizationsRepository: Repository<Organization>
    ){}

    async getOrganizations() {
        return this.organizationsRepository.find();
    }

    async createOrganization(organizationDto: CreateOrganizationDto ): Promise<Organization>{
        return this.organizationsRepository.save(organizationDto);
    }
}
