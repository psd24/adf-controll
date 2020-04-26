import { OrganizationModel } from '../models/organization.model';

export class EventnModel{

    id:number;
    description: string;
    name: string;
    dateInit: Date;
    dateEnd: Date;
    organization: OrganizationModel;

}
