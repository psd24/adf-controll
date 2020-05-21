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
const user_event_entity_1 = require("./user-event.entity");
let Vehicle = class Vehicle {
    constructor(name) {
        this.name = name;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'ID_Vehicle' }),
    __metadata("design:type", Number)
], Vehicle.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Vehicle.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Vehicle.prototype, "type", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Vehicle.prototype, "code", void 0);
__decorate([
    typeorm_1.ManyToOne(type => organization_entity_1.Organization, organization => organization.vehicle),
    __metadata("design:type", organization_entity_1.Organization)
], Vehicle.prototype, "organization", void 0);
__decorate([
    typeorm_1.ManyToMany(() => user_event_entity_1.UserEvent, event => event.vehicle),
    __metadata("design:type", Array)
], Vehicle.prototype, "events", void 0);
Vehicle = __decorate([
    typeorm_1.Entity('vehicle'),
    __metadata("design:paramtypes", [String])
], Vehicle);
exports.Vehicle = Vehicle;
//# sourceMappingURL=vehicle.entity.js.map