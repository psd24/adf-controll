import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class organization1586528489342 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "organization",
            columns: [
                {
                    name: "ID_Organization",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
