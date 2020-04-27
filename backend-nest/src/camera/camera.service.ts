import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Camera } from '../entities/camera.entity';
import { CameraType } from '../entities/camera-type.entity';
import { CameraDto } from './dtos/camera.dto';
import { CameraTypeDto } from './dtos/camera-type.dto';

@Injectable()
export class CameraService {

    constructor(
        @InjectRepository(Camera)
        private readonly cameraRepository: Repository<Camera>,
        @InjectRepository(CameraType)
        private readonly cameraTypeRepository: Repository<CameraType>,
    ) { }

    async getCamera() {
        return this.cameraRepository.find();
    }

    async createCamera(cameraDto: CameraDto): Promise<Camera> {
        return this.cameraRepository.save(cameraDto);
    }

    async getCameraId(_id: number): Promise<Camera> {
        return await this.cameraRepository.findOne({
            where: [{ "id": _id }]
        });
    }

    async updateCamera(camera: Camera): Promise<Camera> {
        return this.cameraRepository.save(camera)
    }

    async deleteCamera(camera: Camera) {
        return this.cameraRepository.delete(camera);
    }

    // CAMERA TYPE

    async getCameraType() {
        return this.cameraTypeRepository.find();
    }

    async createCameraType(cameraTypeDto: CameraTypeDto): Promise<CameraType> {
        return this.cameraTypeRepository.save(cameraTypeDto);
    }

    async getCameraTypeId(_id: number): Promise<CameraType> {
        return await this.cameraTypeRepository.findOne({
            where: [{ "id": _id }]
        });
    }

    async updateCameraType(cameraType: CameraType): Promise<CameraType> {
        return this.cameraRepository.save(cameraType)
    }

    async deleteCameraType(cameraType: CameraType) {
        return this.cameraRepository.delete(cameraType);
    }

}
