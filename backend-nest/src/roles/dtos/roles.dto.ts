import { IsString, IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RolesDto {

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    name: string;
}