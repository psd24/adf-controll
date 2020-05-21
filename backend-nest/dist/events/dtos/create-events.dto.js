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
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateEventsDto {
}
__decorate([
    swagger_1.ApiProperty({ required: true }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateEventsDto.prototype, "name", void 0);
__decorate([
    swagger_1.ApiProperty({ required: true }),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateEventsDto.prototype, "description", void 0);
__decorate([
    swagger_1.ApiProperty({ required: true }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateEventsDto.prototype, "population", void 0);
__decorate([
    swagger_1.ApiProperty({ required: true }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsDateString(),
    __metadata("design:type", Date)
], CreateEventsDto.prototype, "dateInit", void 0);
__decorate([
    swagger_1.ApiProperty({ required: true }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsDateString(),
    __metadata("design:type", Date)
], CreateEventsDto.prototype, "dateEnd", void 0);
__decorate([
    swagger_1.ApiProperty({ required: true }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], CreateEventsDto.prototype, "organizationId", void 0);
exports.CreateEventsDto = CreateEventsDto;
//# sourceMappingURL=create-events.dto.js.map