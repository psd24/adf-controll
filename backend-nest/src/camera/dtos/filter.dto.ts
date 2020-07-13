import { IsObject,} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class FilterDto {

    @ApiProperty({ required: true })
    @IsObject()
    query: object;

}