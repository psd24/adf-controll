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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const organization_entity_1 = require("./organization.entity");
const camera_type_entity_1 = require("./camera-type.entity");
let Camera = class Camera {
    preProcess() {
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'ID_Camera' }),
    __metadata("design:type", Number)
], Camera.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Camera.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Camera.prototype, "ip", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Camera.prototype, "port", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Camera.prototype, "user", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Camera.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Camera.prototype, "url", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Camera.prototype, "lat", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Camera.prototype, "lon", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Camera.prototype, "state", void 0);
__decorate([
    typeorm_1.ManyToOne(() => organization_entity_1.Organization, organization => organization.camera),
    typeorm_1.JoinTable(),
    __metadata("design:type", organization_entity_1.Organization)
], Camera.prototype, "organization", void 0);
__decorate([
    typeorm_1.ManyToOne(() => camera_type_entity_1.CameraType, cameraType => cameraType.camera),
    typeorm_1.JoinTable(),
    __metadata("design:type", camera_type_entity_1.CameraType)
], Camera.prototype, "cameraType", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Camera.prototype, "preProcess", null);
Camera = __decorate([
    typeorm_1.Entity('camera')
], Camera);
exports.Camera = Camera;
//# sourceMappingURL=camera.entity.js.map