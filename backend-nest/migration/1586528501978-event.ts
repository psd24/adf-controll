import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class event1586528501978 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        
        await queryRunner.createTable(new Table({
            name: "event",
            columns: [
                {
                    name: "ID_Event",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "description",
                    type: "varchar",
                },
                {
                    name: "population",
                    type: "varchar",
                },
                {
                    name: "dateInit",
                    type: "date",
                },
                {
                    name: "dateEnd",
                    type: "date",
                },
                {
                    name: "event_user",
                    type: "int",
                }
            ]
        }), true)
        
        await queryRunner.createForeignKey("event", new TableForeignKey({
            columnNames: ["event_user"],
            referencedColumnNames: ["ID_User"],
            referencedTableName: "user",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
