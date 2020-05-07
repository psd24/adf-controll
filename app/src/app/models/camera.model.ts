import { OrganizationModel } from '../models/organization.model';

export class CameraModel{

    id: number;
    name: String;
    ip: String;
    port: String;
    user: String;
    password: String;
    organization: OrganizationModel;
    cameraTypeId: number;

}