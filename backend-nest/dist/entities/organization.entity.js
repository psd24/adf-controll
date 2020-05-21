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
const user_entity_1 = require("./user.entity");
const vehicle_entity_1 = require("./vehicle.entity");
const camera_entity_1 = require("./camera.entity");
const user_event_entity_1 = require("./user-event.entity");
let Organization = class Organization {
    constructor(name) {
        this.name = name;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'ID_Organization' }),
    __metadata("design:type", Number)
], Organization.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Organization.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Organization.prototype, "code", void 0);
__decorate([
    typeorm_1.OneToMany(() => user_entity_1.User, user => user.role),
    __metadata("design:type", Array)
], Organization.prototype, "users", void 0);
__decorate([
    typeorm_1.OneToMany(type => vehicle_entity_1.Vehicle, vehicle => vehicle.organization),
    __metadata("design:type", Array)
], Organization.prototype, "vehicle", void 0);
__decorate([
    typeorm_1.OneToMany(() => camera_entity_1.Camera, camera => camera.organization),
    __metadata("design:type", Array)
], Organization.prototype, "camera", void 0);
__decorate([
    typeorm_1.OneToMany(type => user_event_entity_1.UserEvent, events => events.organization),
    __metadata("design:type", Array)
], Organization.prototype, "events", void 0);
Organization = __decorate([
    typeorm_1.Entity('organization'),
    __metadata("design:paramtypes", [String])
], Organization);
exports.Organization = Organization;
//# sourceMappingURL=organization.entity.js.map