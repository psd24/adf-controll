import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddedCameraStateLonLat1589045823088 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
