import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString,IsNumber } from "class-validator";

export class UpdateTelegramUserDto {
    @ApiProperty({ required: true })
    @IsNumber()
    id: number;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    status: string;
}