"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const seed_module_1 = require("./seed/seed.module");
const roles_module_1 = require("./roles/roles.module");
const organizations_module_1 = require("./organizations/organizations.module");
const events_module_1 = require("./events/events.module");
const camera_module_1 = require("./camera/camera.module");
const ormconfig = require("./ormconfig");
const bot_service_1 = require("./bot/bot.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forRoot(ormconfig), auth_module_1.AuthModule, users_module_1.UsersModule, seed_module_1.SeedModule, roles_module_1.RolesModule, organizations_module_1.OrganizationsModule, events_module_1.EventsModule, camera_module_1.CameraModule],
        controllers: [app_controller_1.AppController],
        providers: [bot_service_1.BotService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map