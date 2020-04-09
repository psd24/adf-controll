import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class role1586468280867 implements MigrationInterface {

    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "rol",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "name",
                    type: "varchar",
                }
            ]
        }), true)

        // await queryRunner.createIndex("question", new TableIndex({
        //     name: "IDX_QUESTION_NAME",
        //     columnNames: ["name"]
        // }));

        // await queryRunner.createForeignKey("answer", new TableForeignKey({
        //     columnNames: ["questionId"],
        //     referencedColumnNames: ["id"],
        //     referencedTableName: "question",
        //     onDelete: "CASCADE"
        // }));
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        
    }

}
