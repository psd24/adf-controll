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
const user_entity_1 = require("../entities/user.entity");
const typeorm_2 = require("typeorm");
const organization_entity_1 = require("../entities/organization.entity");
const role_entity_1 = require("../entities/role.entity");
let UsersService = class UsersService {
    constructor(usersRepository, rolesRepository, organizationsRepository) {
        this.usersRepository = usersRepository;
        this.rolesRepository = rolesRepository;
        this.organizationsRepository = organizationsRepository;
    }
    async findByEmail(email) {
        return this.usersRepository.findOne({
            relations: ['role', 'organization'],
            where: {
                email,
            },
        });
    }
    async register(userDto) {
        const user = await this.findByEmail(userDto.email);
        const newUser = new user_entity_1.User();
        newUser.email = userDto.email;
        newUser.name = userDto.name;
        newUser.code = userDto.code;
        newUser.password = userDto.password;
        newUser.role = await this.rolesRepository.findOne({ id: userDto.role });
        if (!newUser.role) {
            throw new common_1.BadRequestException('Invalid role id.');
        }
        newUser.organization = await this.organizationsRepository.findOne({
            id: userDto.organization,
        });
        if (!newUser.organization) {
            throw new common_1.BadRequestException('Invalid organization id.');
        }
        return this.usersRepository.save(newUser);
    }
    async update(updateUserDto) {
        const user = await this.findByEmail(updateUserDto.email);
        const newUserUpdate = new user_entity_1.User();
        newUserUpdate.id = updateUserDto.id;
        newUserUpdate.email = updateUserDto.email;
        newUserUpdate.name = updateUserDto.name;
        newUserUpdate.code = updateUserDto.code;
        if (updateUserDto.password) {
            newUserUpdate.password = !updateUserDto.password
                ? user.password
                : updateUserDto.password;
        }
        newUserUpdate.role = await this.rolesRepository.findOne({
            id: updateUserDto.role,
        });
        if (!newUserUpdate.role) {
            throw new common_1.BadRequestException('Invalid role id.');
        }
        newUserUpdate.organization = await this.organizationsRepository.findOne({
            id: updateUserDto.organization,
        });
        if (!newUserUpdate.organization) {
            throw new common_1.BadRequestException('Invalid organization id.');
        }
        return this.usersRepository.save(newUserUpdate);
    }
    async saveTelegramUser(user) {
        return this.usersRepository.save(user);
    }
    async resetPassword(resetPasswordDto) {
        const newUserUpdate = new user_entity_1.User();
        newUserUpdate.id = resetPasswordDto.id;
        newUserUpdate.password = resetPasswordDto.password;
        return this.usersRepository.save(newUserUpdate);
    }
    async delete(user) {
        return this.usersRepository.delete(user);
    }
    async getUsers() {
        return this.usersRepository.find({
            relations: ['role', 'organization'],
        });
    }
    async getUser(_id) {
        return this.usersRepository.findOne({
            where: [{ id: _id }],
            relations: ['role', 'organization'],
        });
    }
    async addRoles(roleNames) {
        return this.rolesRepository.save(roleNames.map(r => new role_entity_1.Role(r)));
    }
    async addOrganizations(organizationNames) {
        return this.organizationsRepository.save(organizationNames.map(o => new organization_entity_1.Organization(o)));
    }
    async roleCount() {
        return this.rolesRepository.count();
    }
    async organizationsCount() {
        return this.organizationsRepository.count();
    }
    async usersCount() {
        return this.usersRepository.count();
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __param(1, typeorm_1.InjectRepository(role_entity_1.Role)),
    __param(2, typeorm_1.InjectRepository(organization_entity_1.Organization)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map