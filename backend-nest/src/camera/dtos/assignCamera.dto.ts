import { ApiProperty } from "@nestjs/swagger";
import {IsArray, IsNumber} from "class-validator";

export class AssignCameraDto {

    @ApiProperty({required:true, type:[Number]})
    @IsArray()
    cameraIdList:number[]


}