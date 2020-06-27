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
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const camera_entity_1 = require("../entities/camera.entity");
const camera_type_entity_1 = require("../entities/camera-type.entity");
const camera_service_1 = require("./camera.service");
const camera_dto_1 = require("./dtos/camera.dto");
const cameraCreate_dto_1 = require("./dtos/cameraCreate.dto");
const camera_type_dto_1 = require("./dtos/camera-type.dto");
const filter_dto_1 = require("./dtos/filter.dto");
let CameraController = class CameraController {
    constructor(cameraService) {
        this.cameraService = cameraService;
    }
    get() {
        return this.cameraService.getCamera();
    }
    async getCameraWeb(filter) {
        return this.cameraService.getCameraWeb(filter);
    }
    async countStateCamera() {
        return this.cameraService.countStateCamera();
    }
    getCameraId(params) {
        return this.cameraService.getCameraId(params.id);
    }
    async postCamera(cameraCreateDto) {
        return this.cameraService.createCamera(cameraCreateDto);
    }
    async updateCamera(cameraDto) {
        return this.cameraService.updateCamera(cameraDto);
    }
    deleteCamera(params) {
        return this.cameraService.deleteCamera(params.id);
    }
    getCameraType() {
        return this.cameraService.getCameraType();
    }
    postType(CameraTypeDto) {
        return this.cameraService.createCameraType(CameraTypeDto);
    }
    getCameraTypeId(params) {
        return this.cameraService.getCameraTypeId(params.id);
    }
    updateCameraType(CameraType) {
        return this.cameraService.updateCameraType(CameraType);
    }
    deleteCameraType(params) {
        return this.cameraService.deleteCameraType(params.id);
    }
};
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CameraController.prototype, "get", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('web'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_dto_1.FilterDto]),
    __metadata("design:returntype", Promise)
], CameraController.prototype, "getCameraWeb", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('state/counts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CameraController.prototype, "countStateCamera", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraController.prototype, "getCameraId", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    swagger_1.ApiOkResponse({ type: camera_entity_1.Camera }),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cameraCreate_dto_1.CameraCreateDto]),
    __metadata("design:returntype", Promise)
], CameraController.prototype, "postCamera", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Put(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [camera_dto_1.CameraDto]),
    __metadata("design:returntype", Promise)
], CameraController.prototype, "updateCamera", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraController.prototype, "deleteCamera", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('type/index'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CameraController.prototype, "getCameraType", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    swagger_1.ApiOkResponse({ type: camera_entity_1.Camera }),
    common_1.Post('type'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [camera_type_dto_1.CameraTypeDto]),
    __metadata("design:returntype", void 0)
], CameraController.prototype, "postType", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('type/:id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraController.prototype, "getCameraTypeId", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Put('type'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [camera_type_entity_1.CameraType]),
    __metadata("design:returntype", void 0)
], CameraController.prototype, "updateCameraType", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete('type/:id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CameraController.prototype, "deleteCameraType", null);
CameraController = __decorate([
    swagger_1.ApiTags('Authentication'),
    common_1.Controller('camera'),
    __metadata("design:paramtypes", [camera_service_1.CameraService])
], CameraController);
exports.CameraController = CameraController;
//# sourceMappingURL=camera.controller.js.map