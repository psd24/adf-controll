import { IsString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CameraCreateDto {

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
  @IsNumber()
  organizationId: number;

  @ApiProperty({ required: true })
  @IsNumber()
  cameraTypeId: number;
  url?: string;
}
