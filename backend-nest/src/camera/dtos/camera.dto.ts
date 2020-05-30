import { IsString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CameraDto {

  @ApiProperty({ required: true })
  @IsNumber()
  id?: number;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  ip: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  port: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  user: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: true })
  @IsString()
  lat: string;

  @ApiProperty({ required: true })
  @IsString()
  lon: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  state: number;

  @ApiProperty({ required: true })
  @IsNumber()
  organizationId: number;

  @ApiProperty({ required: true })
  @IsNumber()
  cameraTypeId: number;
  url?: string;
}
