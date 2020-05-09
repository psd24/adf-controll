import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsNumber, IsNotEmpty } from "class-validator";

export class UpdateUserDto {

    @ApiProperty({ required: true })
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    password: string;
    
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    code: string;

    @ApiProperty({ required: true })
    @IsNumber()
    role: number;

    @ApiProperty({ required: true })
    @IsNumber()
    organization: number;
}
