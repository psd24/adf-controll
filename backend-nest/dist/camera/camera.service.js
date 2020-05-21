"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const camera_entity_1 = require("../entities/camera.entity");
const camera_type_entity_1 = require("../entities/camera-type.entity");
const organization_entity_1 = require("../entities/organization.entity");
let CameraService = class CameraService {
    constructor(cameraRepository, cameraTypeRepository, organizationRepository) {
        this.cameraRepository = cameraRepository;
        this.cameraTypeRepository = cameraTypeRepository;
        this.organizationRepository = organizationRepository;
    }
    async getCamera() {
        return this.cameraRepository.find({
            relations: ["organization", "cameraType"],
            where: [{ state: 1 }],
        });
    }
    async getCameraWeb(filter) {
        return this.cameraRepository.find(filter.query);
    }
    async createCamera(cameraCreateDto) {
        let url;
        const newCamera = new camera_entity_1.Camera();
        newCamera.ip = cameraCreateDto.ip;
        newCamera.name = cameraCreateDto.name;
        newCamera.port = cameraCreateDto.port;
        newCamera.user = cameraCreateDto.user;
        newCamera.lat = cameraCreateDto.lat;
        newCamera.lon = cameraCreateDto.lon;
        newCamera.state = cameraCreateDto.state;
        newCamera.password = cameraCreateDto.password;
        newCamera.organization = await this.organizationRepository.findOne({ id: cameraCreateDto.organizationId });
        newCamera.cameraType = await this.cameraTypeRepository.findOne({ id: cameraCreateDto.cameraTypeId });
        if (cameraCreateDto.cameraTypeId === 1) {
            url = `http://${cameraCreateDto.ip}:${cameraCreateDto.port}/cgi-bin/CGIProxy.fcgi?cmd=snapPicture2&usr=${cameraCreateDto.user}&pwd=${cameraCreateDto.password}`;
            newCamera.url = url;
        }
        if (cameraCreateDto.cameraTypeId === 2) {
            url = `http://${cameraCreateDto.ip}:${cameraCreateDto.port}/onvifsnapshot/media_service/snapshot`;
            newCamera.url = url;
        }
        else {
            cameraCreateDto;
        }
        console.log(newCamera);
        return this.cameraRepository.save(newCamera);
    }
    async getCameraId(_id) {
        return await this.cameraRepository.findOne({
            where: [{ id: _id }],
            relations: ["organization", "cameraType"]
        });
    }
    async updateCamera(cameraDto) {
        let url;
        const newCamera = new camera_entity_1.Camera();
        newCamera.id = cameraDto.id;
        newCamera.ip = cameraDto.ip;
        newCamera.name = cameraDto.name;
        newCamera.port = cameraDto.port;
        newCamera.user = cameraDto.user;
        newCamera.password = cameraDto.password;
        newCamera.lat = cameraDto.lat;
        newCamera.lon = cameraDto.lon;
        newCamera.state = cameraDto.state;
        newCamera.organization = await this.organizationRepository.findOne({ id: cameraDto.organizationId });
        newCamera.cameraType = await this.cameraTypeRepository.findOne({ id: cameraDto.cameraTypeId });
        if (cameraDto.cameraTypeId === 1) {
            url = `http://${cameraDto.ip}:${cameraDto.port}/cgi-bin/CGIProxy.fcgi?cmd=snapPicture2&usr=${cameraDto.user}&pwd=${cameraDto.password}`;
            newCamera.url = url;
        }
        if (cameraDto.cameraTypeId === 2) {
            url = `http://${cameraDto.ip}:${cameraDto.port}/onvifsnapshot/media_service/snapshot`;
            newCamera.url = url;
        }
        else {
            cameraDto;
        }
        return this.cameraRepository.save(newCamera);
    }
    async deleteCamera(camera) {
        return this.cameraRepository.delete(camera);
    }
    async getCameraType() {
        return this.cameraTypeRepository.find();
    }
    async createCameraType(cameraTypeDto) {
        return this.cameraTypeRepository.save(cameraTypeDto);
    }
    async getCameraTypeId(_id) {
        return await this.cameraTypeRepository.findOne({
            where: [{ id: _id }],
        });
    }
    async updateCameraType(cameraType) {
        return this.cameraTypeRepository.save(cameraType);
    }
    async deleteCameraType(cameraType) {
        return this.cameraTypeRepository.delete(cameraType);
    }
    async countStateCamera() {
        const inactive = await this.cameraRepository.count({
            where: [{ state: 0 }],
        });
        const active = await this.cameraRepository.count({
            where: [{ state: 1 }],
        });
        const pending = await this.cameraRepository.count({
            where: [{ state: 2 }],
        });
        return { 'inactive': inactive, 'active': active, 'pending': pending };
    }
};
CameraService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(camera_entity_1.Camera)),
    __param(1, typeorm_1.InjectRepository(camera_type_entity_1.CameraType)),
    __param(2, typeorm_1.InjectRepository(organization_entity_1.Organization)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CameraService);
exports.CameraService = CameraService;
//# sourceMappingURL=camera.service.js.map