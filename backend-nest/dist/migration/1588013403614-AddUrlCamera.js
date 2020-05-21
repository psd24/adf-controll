"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AddUrlCamera1588013403614 {
    constructor() {
        this.name = 'AddUrlCamera1588013403614';
    }
    async up(queryRunner) {
        await queryRunner.query("ALTER TABLE `camera` ADD `url` varchar(255) NOT NULL", undefined);
    }
    async down(queryRunner) {
        await queryRunner.query("ALTER TABLE `camera` DROP COLUMN `url`", undefined);
    }
}
exports.AddUrlCamera1588013403614 = AddUrlCamera1588013403614;
//# sourceMappingURL=1588013403614-AddUrlCamera.js.map