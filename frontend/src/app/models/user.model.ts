import { OrganizationModel } from './organization.model';
import { RoleModel } from './role.model';

export class UserModel{

    id: number;
    code:string;
    email: string;
    name: string;
    password: string;
    organization: OrganizationModel;
    role: RoleModel;

}
