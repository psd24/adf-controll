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
const camera_entity_1 = require("./camera.entity");
let CameraType = class CameraType {
    constructor(name) {
        this.name = name;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'ID_Camera_Type' }),
    __metadata("design:type", Number)
], CameraType.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CameraType.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], CameraType.prototype, "type", void 0);
__decorate([
    typeorm_1.OneToMany(() => camera_entity_1.Camera, camera => camera.cameraType),
    __metadata("design:type", Array)
], CameraType.prototype, "camera", void 0);
CameraType = __decorate([
    typeorm_1.Entity('camera-type'),
    __metadata("design:paramtypes", [String])
], CameraType);
exports.CameraType = CameraType;
//# sourceMappingURL=camera-type.entity.js.map