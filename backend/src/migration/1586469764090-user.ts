import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class user1586469764090 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "ID_User",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "email",
                    type: "varchar",
                },
                {
                    name: "password",
                    type: "varchar",
                },
                {
                    name: "code",
                    type: "varchar",
                },
                {
                    name: "user_role",
                    type: "int",
                },
                {
                    name: "user_organization",
                    type: "int",
                }
                
            ]
        }), true)

        await queryRunner.createForeignKey("user", new TableForeignKey({
            columnNames: ["user_role"],
            referencedColumnNames: ["ID_Role"],
            referencedTableName: "role",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("user", new TableForeignKey({
            columnNames: ["user_organization"],
            referencedColumnNames: ["ID_Organization"],
            referencedTableName: "organization",
            onDelete: "CASCADE"
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
