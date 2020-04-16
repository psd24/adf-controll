import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty } from "class-validator";

export class CreateEventUserDto {
    @ApiProperty({ required: true })
    @IsNumber()
    @IsNotEmpty()
    eventId: number;
    
    @ApiProperty({ required: true })
    @IsNumber()
    @IsNotEmpty()
    userIDUser: number;
}
