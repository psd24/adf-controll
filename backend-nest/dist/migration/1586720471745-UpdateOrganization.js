"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateOrganization1586720471745 {
    constructor() {
        this.name = 'UpdateOrganization1586720471745';
    }
    async up(queryRunner) {
        await queryRunner.query("ALTER TABLE `organization` ADD `code` varchar(255) NOT NULL", undefined);
    }
    async down(queryRunner) {
        await queryRunner.query("ALTER TABLE `organization` DROP COLUMN `code`", undefined);
    }
}
exports.UpdateOrganization1586720471745 = UpdateOrganization1586720471745;
//# sourceMappingURL=1586720471745-UpdateOrganization.js.map