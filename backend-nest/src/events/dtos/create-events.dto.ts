import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsNotEmpty, IsDateString } from "class-validator";

export class CreateEventsDto {
    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @ApiProperty({ required: true })
    @IsString()
    @IsNotEmpty()
    description: string;
    
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    population: string;
    
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsDateString()
    dateInit: Date;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsDateString()
    dateEnd: Date;
    
    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsNumber()
    organizationId: number;
}
