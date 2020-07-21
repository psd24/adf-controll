
import { IsObject } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class FilterWebDto {

    @ApiProperty({ required: true })
    @IsObject()
    query: object;

}
