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
const user_event_entity_1 = require("../entities/user-event.entity");
const user_entity_1 = require("../entities/user.entity");
const organization_entity_1 = require("../entities/organization.entity");
const typeorm_2 = require("typeorm");
let EventsService = class EventsService {
    constructor(userEventRepository, userRepository, organizationRepository) {
        this.userEventRepository = userEventRepository;
        this.userRepository = userRepository;
        this.organizationRepository = organizationRepository;
    }
    async create(userEventDto, organizationId) {
        const newUserEvent = new user_event_entity_1.UserEvent();
        newUserEvent.name = userEventDto.name;
        newUserEvent.description = userEventDto.description;
        newUserEvent.population = userEventDto.population;
        newUserEvent.dateInit = userEventDto.dateInit;
        newUserEvent.dateEnd = userEventDto.dateEnd;
        newUserEvent.organization = await this.organizationRepository.findOne({ id: organizationId });
        return await this.userEventRepository.save(newUserEvent);
    }
    async list(organization) {
        let findList = await this.userEventRepository.find({
            relations: ["organization"],
            where: {
                organization: {
                    id: organization
                }
            }
        });
        return findList;
    }
    async adminList(organization) {
        let findList = await this.userEventRepository.find({
            relations: ["organization"],
            where: {
                organization: {
                    id: organization
                }
            }
        });
        return findList;
    }
    async createEventUser(createEventUserDto) {
        try {
            await typeorm_2.getConnection()
                .createQueryBuilder()
                .insert()
                .into('event_users_user')
                .values([
                { eventId: createEventUserDto.eventId, userIDUser: createEventUserDto.userIDUser },
            ])
                .execute();
            return ({ success: true, message: 'Insert successfully!' });
        }
        catch (err) {
            return ({ success: false, message: 'Failed!' });
        }
    }
    async deleteEventUser(createEventUserDto) {
        try {
            await typeorm_2.getConnection()
                .createQueryBuilder()
                .delete()
                .from('event_users_user')
                .where("eventId = :eventId", { eventId: createEventUserDto.eventId })
                .andWhere("userIDUser = :userIDUser", { userIDUser: createEventUserDto.userIDUser })
                .execute();
            return ({ success: true, message: 'Delete successfully!' });
        }
        catch (err) {
            return ({ success: false, message: 'Failed!' });
        }
    }
};
EventsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_event_entity_1.UserEvent)),
    __param(1, typeorm_1.InjectRepository(user_entity_1.User)),
    __param(2, typeorm_1.InjectRepository(organization_entity_1.Organization)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], EventsService);
exports.EventsService = EventsService;
//# sourceMappingURL=events.service.js.map