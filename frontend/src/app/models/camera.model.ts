import { OrganizationModel } from '../models/organization.model';
import { CameraTypeModel } from '../models/camera-type.model';

export class CameraModel{

    id: number;
    name: String;
    ip: String;
    port: String;
    user: String;
    password: String;
    lat: String;
    lon: String;
    state: number;
    organization: OrganizationModel;
    cameraType: CameraTypeModel;

}