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
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const roleNames = ['admin', 'customer'];
const organizationNames = ['google', 'microsoft', 'apple'];
const defaultPassword = 'password';
let SeedService = class SeedService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async start() {
        const admin = await this.usersService.findByEmail('admin@admin.com');
        if (!admin) {
            const roles = await this.usersService.addRoles(roleNames);
            const organizations = await this.usersService.addOrganizations(organizationNames);
            await this.usersService.register({
                name: 'admin',
                email: 'admin@admin.com',
                role: roles[0].id,
                code: 'simple code',
                organization: organizations[0].id,
                password: defaultPassword,
            });
        }
    }
};
SeedService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], SeedService);
exports.SeedService = SeedService;
//# sourceMappingURL=seed.service.js.map