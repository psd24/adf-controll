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
const events_service_1 = require("./events.service");
const user_event_entity_1 = require("../entities/user-event.entity");
const create_events_dto_1 = require("../events/dtos/create-events.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_event_user_dto_1 = require("./dtos/create-event-user.dto");
let EventsController = class EventsController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(registerDto, req) {
        return this.authService.create(registerDto, req.user.organization.id);
    }
    async list(req) {
        return this.authService.list(req.user.organization.id);
    }
    async adminlist(params) {
        return this.authService.adminList(params.id);
    }
    async createEventUser(createEventUserDto) {
        return this.authService.createEventUser(createEventUserDto);
    }
    async deleteEventUser(createEventUserDto) {
        return this.authService.deleteEventUser(createEventUserDto);
    }
};
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    swagger_1.ApiOkResponse({ type: user_event_entity_1.UserEvent }),
    common_1.Post('create'),
    __param(0, common_1.Body()), __param(1, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_events_dto_1.CreateEventsDto, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "register", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('list'),
    __param(0, common_1.Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "list", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Get('admin/list/:id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "adminlist", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Post('user-event'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_user_dto_1.CreateEventUserDto]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "createEventUser", null);
__decorate([
    swagger_1.ApiBearerAuth(),
    common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
    common_1.Delete('user-event'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_user_dto_1.CreateEventUserDto]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "deleteEventUser", null);
EventsController = __decorate([
    swagger_1.ApiTags('Authentication'),
    common_1.Controller('events'),
    __metadata("design:paramtypes", [events_service_1.EventsService])
], EventsController);
exports.EventsController = EventsController;
//# sourceMappingURL=events.controller.js.map