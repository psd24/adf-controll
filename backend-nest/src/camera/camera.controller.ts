import {
  Controller,
  UseGuards,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete, Inject,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Camera } from '../entities/camera.entity';
import { CameraType } from '../entities/camera-type.entity';
import { CameraService } from './camera.service';
import { CameraDto } from './dtos/camera.dto';
import { CameraCreateDto } from './dtos/cameraCreate.dto';
import { CameraTypeDto } from './dtos/camera-type.dto';
import { FilterDto } from './dtos/filter.dto';
import {AssignCameraDto} from "./dtos/assignCamera.dto";
import { Request } from 'express';
import {REQUEST} from "@nestjs/core";

@ApiTags('Authentication')
@Controller('camera')
export class CameraController {
  constructor(private cameraService: CameraService,@Inject(REQUEST) private readonly request: Request) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  get() {
    return this.cameraService.getCamera();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('web')
  async getCameraWeb(@Body() filter: FilterDto) {
    // @ts-ignore
    return this.cameraService.getCameraWeb(filter, this.request.user.id);
  }


  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('assignCamera')
  async assignCameraToUser(@Body() assignCameraDto: AssignCameraDto) {
    // @ts-ignore
   return await this.cameraService.assignCameraToUser(assignCameraDto,this.request.user.id)

  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('state/counts')
  async countStateCamera() {
    return this.cameraService.countStateCamera();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getCameraId(@Param() params) {
    return this.cameraService.getCameraId(params.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: Camera })
  @Post()
  async postCamera(@Body() cameraCreateDto: CameraCreateDto) {
    return this.cameraService.createCamera(cameraCreateDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put()
  async updateCamera(@Body() cameraDto: CameraDto) {
    return this.cameraService.updateCamera(cameraDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteCamera(@Param() params) {
    return this.cameraService.deleteCamera(params.id);
  }

  // CAMERA TYPE

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('type/index')
  getCameraType() {
    return this.cameraService.getCameraType();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: Camera })
  @Post('type')
  postType(@Body() CameraTypeDto: CameraTypeDto) {
    return this.cameraService.createCameraType(CameraTypeDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('type/:id')
  getCameraTypeId(@Param() params) {
    return this.cameraService.getCameraTypeId(params.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('type')
  updateCameraType(@Body() CameraType: CameraType) {
    return this.cameraService.updateCameraType(CameraType);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('type/:id')
  deleteCameraType(@Param() params) {
    return this.cameraService.deleteCameraType(params.id);
  }
}
