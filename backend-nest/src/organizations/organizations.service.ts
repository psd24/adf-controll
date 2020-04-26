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

    async getOneOrganizations(_id: number): Promise<Organization> {
        return await this.organizationsRepository.findOne({
            where: [{ "id": _id }]
        });
    }

    async createOrganization(organizationDto: CreateOrganizationDto ): Promise<Organization>{
        return this.organizationsRepository.save(organizationDto);
    }

    async update(organization: Organization) {
        this.organizationsRepository.save(organization)
    }

    async delete(organization: Organization) {
        this.organizationsRepository.delete(organization);
    }

    async organizationsCount(): Promise<number> {
        return this.organizationsRepository.count();
    }
}
