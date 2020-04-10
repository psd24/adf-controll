import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class userEvent1586528508499 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.createTable(new Table({
            name: "user_event",
            columns: [
                {
                    name: "ID_UserEvent",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "eventUser_event",
                    type: "int",
                },
                {
                    name: "eventUser_user",
                    type: "int",
                },
                {
                    name: "validator",
                    type: "boolean",
                }
            ]
        }), true)
        
        await queryRunner.createForeignKey("user_event", new TableForeignKey({
            columnNames: ["eventUser_event"],
            referencedColumnNames: ["ID_Event"],
            referencedTableName: "event",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("user_event", new TableForeignKey({
            columnNames: ["eventUser_user"],
            referencedColumnNames: ["ID_User"],
            referencedTableName: "user",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
