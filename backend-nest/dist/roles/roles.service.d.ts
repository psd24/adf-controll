import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { RolesDto } from './dtos/roles.dto';
export declare class RolesService {
    private readonly rolesRepository;
    constructor(rolesRepository: Repository<Role>);
    getRoles(): Promise<Role[]>;
    getRole(_id: number): Promise<Role>;
    createRole(roleDto: RolesDto): Promise<Role>;
    delete(role: Role): Promise<import("typeorm").DeleteResult>;
    update(role: Role): Promise<Role>;
}
