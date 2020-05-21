import { Repository } from 'typeorm';
import { Organization } from '../entities/organization.entity';
import { CreateOrganizationDto } from './dtos/createOrganization.dtos';
export declare class OrganizationsService {
    private readonly organizationsRepository;
    constructor(organizationsRepository: Repository<Organization>);
    getOrganizations(): Promise<Organization[]>;
    getOneOrganizations(_id: number): Promise<Organization>;
    createOrganization(organizationDto: CreateOrganizationDto): Promise<Organization>;
    update(organization: Organization): Promise<void>;
    delete(organization: Organization): Promise<void>;
    organizationsCount(): Promise<number>;
}
