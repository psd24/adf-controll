import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class FilterDto {

    @ApiProperty({ required: true })
    @IsString()
    query: string;

}