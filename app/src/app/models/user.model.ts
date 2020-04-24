import { OrganizationModel } from './organization.model';

export class UserModel{

    code:string;
    email: string;
    name: string;
    password: string;
    organization: OrganizationModel;

}
