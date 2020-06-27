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
const class_transformer_1 = require("class-transformer");
const bcryptjs_1 = require("bcryptjs");
const role_entity_1 = require("./role.entity");
const organization_entity_1 = require("./organization.entity");
const user_event_entity_1 = require("./user-event.entity");
let User = class User {
    preProcess() {
        return bcryptjs_1.hash(this.password, 10).then(encrypted => (this.password = encrypted));
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'ID_User' }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "code", void 0);
__decorate([
    typeorm_1.ManyToOne(() => organization_entity_1.Organization, organization => organization.users),
    __metadata("design:type", organization_entity_1.Organization)
], User.prototype, "organization", void 0);
__decorate([
    typeorm_1.ManyToOne(() => role_entity_1.Role, role => role.users),
    __metadata("design:type", role_entity_1.Role)
], User.prototype, "role", void 0);
__decorate([
    typeorm_1.ManyToMany(() => user_event_entity_1.UserEvent, event => event.users),
    __metadata("design:type", Array)
], User.prototype, "events", void 0);
__decorate([
    typeorm_1.Column(),
    class_transformer_1.Exclude(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "authorizeConnection", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], User.prototype, "chatId", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "preProcess", null);
User = __decorate([
    typeorm_1.Entity({ name: 'user' })
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map