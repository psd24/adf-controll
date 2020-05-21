import { Repository } from 'typeorm';
import { Camera } from '../entities/camera.entity';
import { CameraType } from '../entities/camera-type.entity';
import { Organization } from '../entities/organization.entity';
import { CameraDto } from './dtos/camera.dto';
import { CameraCreateDto } from './dtos/cameraCreate.dto';
import { CameraTypeDto } from './dtos/camera-type.dto';
import { FilterDto } from './dtos/filter.dto';
export declare class CameraService {
    private readonly cameraRepository;
    private readonly cameraTypeRepository;
    private readonly organizationRepository;
    constructor(cameraRepository: Repository<Camera>, cameraTypeRepository: Repository<CameraType>, organizationRepository: Repository<Organization>);
    getCamera(): Promise<Camera[]>;
    getCameraWeb(filter: FilterDto): Promise<Camera[]>;
    createCamera(cameraCreateDto: CameraCreateDto): Promise<Camera>;
    getCameraId(_id: number): Promise<Camera>;
    updateCamera(cameraDto: CameraDto): Promise<Camera>;
    deleteCamera(camera: Camera): Promise<import("typeorm").DeleteResult>;
    getCameraType(): Promise<CameraType[]>;
    createCameraType(cameraTypeDto: CameraTypeDto): Promise<CameraType>;
    getCameraTypeId(_id: number): Promise<CameraType>;
    updateCameraType(cameraType: CameraType): Promise<CameraType>;
    deleteCameraType(cameraType: CameraType): Promise<import("typeorm").DeleteResult>;
    countStateCamera(): Promise<{
        inactive: number;
        active: number;
        pending: number;
    }>;
}
