import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Camera } from '../entities/camera.entity';
import { CameraType } from '../entities/camera-type.entity';
import { Organization } from '../entities/organization.entity';
import { CameraDto } from './dtos/camera.dto';
import { CameraCreateDto } from './dtos/cameraCreate.dto';
import { CameraTypeDto } from './dtos/camera-type.dto';

@Injectable()
export class CameraService {
  constructor(
    @InjectRepository(Camera)
    private readonly cameraRepository: Repository<Camera>,
    @InjectRepository(CameraType)
    private readonly cameraTypeRepository: Repository<CameraType>,
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
  ) {}

  async getCamera() {
    return this.cameraRepository.find(
      { relations: ["organization", "cameraType"] }
    );
  }

  async createCamera(cameraCreateDto: CameraCreateDto): Promise<Camera> {
    let url;
    const newCamera = new Camera();
    newCamera.ip = cameraCreateDto.ip;
    newCamera.name = cameraCreateDto.name
    newCamera.port =cameraCreateDto.port;
    newCamera.user = cameraCreateDto.user;
    newCamera.password = cameraCreateDto.password;
    newCamera.organization = await this.organizationRepository.findOne({ id: cameraCreateDto.organizationId });
    newCamera.cameraType = await this.cameraTypeRepository.findOne({ id: cameraCreateDto.cameraTypeId });
    
    if (cameraCreateDto.cameraTypeId === 1) {
      url = `http://${cameraCreateDto.ip}:${cameraCreateDto.port}/cgi-bin/CGIProxy.fcgi?cmd=snapPicture2&usr=${cameraCreateDto.user}&pwd=${cameraCreateDto.password}`;
      newCamera.url = url;
    }
    if (cameraCreateDto.cameraTypeId === 2) {
      url = `http://${cameraCreateDto.user}:${cameraCreateDto.password}@${cameraCreateDto.ip}:${cameraCreateDto.port}/cgi-bin/snapshot.cgi?chn=0&u=${cameraCreateDto.user}&p=${cameraCreateDto.password}`;
      // http://pvidiba:incendis19@185.73.168.32/cgi-bin/snapshot.cgi?chn=0&u=pvidiba&p=incendis19
      newCamera.url = url
    } else {
      cameraCreateDto;
    }
    console.log(newCamera);
    return this.cameraRepository.save(newCamera);
  }

  async getCameraId(_id: number): Promise<Camera> {
    return await this.cameraRepository.findOne({
      where: [{ id: _id }],
    });
  }

  async updateCamera(cameraDto: CameraDto): Promise<Camera> {
    let url;
    const newCamera = new Camera();
    newCamera.id = cameraDto.id;
    newCamera.ip = cameraDto.ip;
    newCamera.name = cameraDto.name
    newCamera.port =cameraDto.port;
    newCamera.user = cameraDto.user;
    newCamera.password = cameraDto.password;
    newCamera.organization = await this.organizationRepository.findOne({ id: cameraDto.organizationId });
    newCamera.cameraType = await this.cameraTypeRepository.findOne({ id: cameraDto.cameraTypeId });
    
    if (cameraDto.cameraTypeId === 1) {
      url = `http://${cameraDto.ip}:${cameraDto.port}/cgi-bin/CGIProxy.fcgi?cmd=snapPicture2&usr=${cameraDto.user}&pwd=${cameraDto.password}`;
      newCamera.url = url;
    }
    if (cameraDto.cameraTypeId === 2) {
      url = `http://${cameraDto.ip}:${cameraDto.port}/cgi-bin/snapshot.cgi?chn=0&u=${cameraDto.user}&p=${cameraDto.password}`;

      newCamera.url = url
    } else {
      cameraDto;
    }
    return this.cameraRepository.save(newCamera);
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
      where: [{ id: _id }],
    });
  }

  async updateCameraType(cameraType: CameraType): Promise<CameraType> {
    return this.cameraRepository.save(cameraType);
  }

  async deleteCameraType(cameraType: CameraType) {
    return this.cameraRepository.delete(cameraType);
  }
}
