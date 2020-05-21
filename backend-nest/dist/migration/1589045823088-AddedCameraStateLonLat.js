"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AddedCameraStateLonLat1589045823088 {
    constructor() {
        this.name = 'AddedCameraStateLonLat1589045823088';
    }
    async up(queryRunner) {
        await queryRunner.query("ALTER TABLE `camera` ADD `lat` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `camera` ADD `lon` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `camera` ADD `state` int NOT NULL", undefined);
    }
    async down(queryRunner) {
        await queryRunner.query("ALTER TABLE `camera` DROP COLUMN `state`", undefined);
        await queryRunner.query("ALTER TABLE `camera` DROP COLUMN `lon`", undefined);
        await queryRunner.query("ALTER TABLE `camera` DROP COLUMN `lat`", undefined);
    }
}
exports.AddedCameraStateLonLat1589045823088 = AddedCameraStateLonLat1589045823088;
//# sourceMappingURL=1589045823088-AddedCameraStateLonLat.js.map