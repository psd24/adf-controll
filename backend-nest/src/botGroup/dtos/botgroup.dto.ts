import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString,IsNumber } from "class-validator";
import {Column, PrimaryGeneratedColumn} from "typeorm";

export class BotgroupDto {
    @ApiProperty({ required: true })
    @IsNumber()
    id: number;

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    name:string

    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    authorizeConnection:string
}