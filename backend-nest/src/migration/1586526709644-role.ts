import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class role1586526709644 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "role",
            columns: [
                {
                    name: "ID_Role",
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
