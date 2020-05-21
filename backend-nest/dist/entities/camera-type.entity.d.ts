import { Camera } from './camera.entity';
export declare class CameraType {
    id: number;
    name: string;
    type: string;
    camera: Camera[];
    constructor(name: string);
}
