import { ApiProperty } from "@nestjs/swagger";
import {IsArray, IsNumber} from "class-validator";

export class AssignCameraDto {

    @ApiProperty({required:true, type:[Number]})
    @IsArray()
    assignCameraIdList:number[]

    @ApiProperty({required:true, type:[Number]})
    @IsArray()
    unAssignCameraIdList:number[]

    @ApiProperty({required:true})
    @IsNumber()
    userId:number

}