"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const bot_service_1 = require("./bot.service");
const camera_module_1 = require("../camera/camera.module");
let BotModule = class BotModule {
};
BotModule = __decorate([
    common_1.Module({
        imports: [camera_module_1.CameraModule],
        exports: [bot_service_1.BotService],
    })
], BotModule);
exports.BotModule = BotModule;
//# sourceMappingURL=bot.module.js.map