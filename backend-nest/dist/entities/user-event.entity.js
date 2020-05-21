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
const organization_entity_1 = require("./organization.entity");
let UserEvent = class UserEvent {
};
__decorate([
    typeorm_1.Column({ name: 'ID_Event' }),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserEvent.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserEvent.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserEvent.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], UserEvent.prototype, "population", void 0);
__decorate([
    typeorm_1.Column({ type: Date }),
    __metadata("design:type", Date)
], UserEvent.prototype, "dateInit", void 0);
__decorate([
    typeorm_1.Column({ type: Date }),
    __metadata("design:type", Date)
], UserEvent.prototype, "dateEnd", void 0);
__decorate([
    typeorm_1.ManyToMany(() => user_entity_1.User, user => user.events),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], UserEvent.prototype, "users", void 0);
__decorate([
    typeorm_1.ManyToOne(() => organization_entity_1.Organization, organization => organization.events),
    __metadata("design:type", organization_entity_1.Organization)
], UserEvent.prototype, "organization", void 0);
__decorate([
    typeorm_1.ManyToMany(() => vehicle_entity_1.Vehicle, vehicle => vehicle.events),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], UserEvent.prototype, "vehicle", void 0);
UserEvent = __decorate([
    typeorm_1.Entity('event')
], UserEvent);
exports.UserEvent = UserEvent;
//# sourceMappingURL=user-event.entity.js.map