import { Camera } from '../entities/camera.entity';
import { CameraType } from '../entities/camera-type.entity';
import { CameraService } from './camera.service';
import { CameraDto } from './dtos/camera.dto';
import { CameraCreateDto } from './dtos/cameraCreate.dto';
import { CameraTypeDto } from './dtos/camera-type.dto';
import { FilterDto } from './dtos/filter.dto';
export declare class CameraController {
    private cameraService;
    constructor(cameraService: CameraService);
    get(): Promise<Camera[]>;
    getCameraWeb(filter: FilterDto): Promise<Camera[]>;
    countStateCamera(): Promise<{
        inactive: number;
        active: number;
        pending: number;
    }>;
    getCameraId(params: any): Promise<Camera>;
    postCamera(cameraCreateDto: CameraCreateDto): Promise<Camera>;
    updateCamera(cameraDto: CameraDto): Promise<Camera>;
    deleteCamera(params: any): Promise<import("typeorm").DeleteResult>;
    getCameraType(): Promise<CameraType[]>;
    postType(CameraTypeDto: CameraTypeDto): Promise<CameraType>;
    getCameraTypeId(params: any): Promise<CameraType>;
    updateCameraType(CameraType: CameraType): Promise<CameraType>;
    deleteCameraType(params: any): Promise<import("typeorm").DeleteResult>;
}
