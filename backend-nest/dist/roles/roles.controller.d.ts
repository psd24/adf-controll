import { RolesService } from './roles.service';
import { Role } from '../entities/role.entity';
import { RolesDto } from 'src/roles/dtos/roles.dto';
export declare class RolesController {
    private service;
    constructor(service: RolesService);
    get(): Promise<Role[]>;
    getRole(params: any): Promise<Role>;
    post(roleDto: RolesDto): Promise<Role>;
    delete(params: any): Promise<import("typeorm").DeleteResult>;
    update(role: Role): Promise<Role>;
}
