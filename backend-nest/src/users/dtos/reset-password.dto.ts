import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsNumber, IsNotEmpty } from "class-validator";

export class ResetPasswordDto {

    @ApiProperty({ required: true })
    @IsNumber()
    @IsNotEmpty()
    id: number;
    
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    password: string;

}
