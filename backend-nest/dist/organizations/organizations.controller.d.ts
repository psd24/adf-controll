import { OrganizationsService } from './organizations.service';
import { Organization } from '../entities/organization.entity';
import { CreateOrganizationDto } from './dtos/createOrganization.dtos';
export declare class OrganizationsController {
    private organizationsService;
    constructor(organizationsService: OrganizationsService);
    get(): Promise<Organization[]>;
    getCount(): Promise<number>;
    getOrganization(params: any): Promise<Organization>;
    post(organizationDto: CreateOrganizationDto): Promise<Organization>;
    update(organization: Organization): Promise<void>;
    deleteUser(params: any): Promise<void>;
}
