import { Organization } from './organization.entity';
import { CameraType } from './camera-type.entity';
export declare class Camera {
    id: number;
    name: string;
    ip: string;
    port: string;
    user: string;
    password: string;
    url: string;
    lat: string;
    lon: string;
    state: number;
    organization: Organization;
    cameraType: CameraType;
    preProcess(): void;
}
