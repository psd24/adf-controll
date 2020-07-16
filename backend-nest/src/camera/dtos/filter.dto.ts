import {IsNumber, IsObject, IsString,} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class FilterDto {

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNumber()
    state: number;

}