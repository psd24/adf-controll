"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AddedRelationUserEventAndOrganization1587409069309 {
    constructor() {
        this.name = 'AddedRelationUserEventAndOrganization1587409069309';
    }
    async up(queryRunner) {
        await queryRunner.query("ALTER TABLE `event` ADD `organizationId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `event` ADD CONSTRAINT `FK_4db6d1ac45a58cb20e01ea9699c` FOREIGN KEY (`organizationId`) REFERENCES `organization`(`ID_Organization`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }
    async down(queryRunner) {
        await queryRunner.query("ALTER TABLE `event` DROP FOREIGN KEY `FK_4db6d1ac45a58cb20e01ea9699c`", undefined);
        await queryRunner.query("ALTER TABLE `event` DROP COLUMN `organizationId`", undefined);
    }
}
exports.AddedRelationUserEventAndOrganization1587409069309 = AddedRelationUserEventAndOrganization1587409069309;
//# sourceMappingURL=1587409069309-AddedRelationUserEventAndOrganization.js.map