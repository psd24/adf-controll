import {
  Controller,
  UseGuards,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Camera } from '../entities/camera.entity';
import { CameraType } from '../entities/camera-type.entity';
import { CameraService } from './camera.service';
import { CameraDto } from './dtos/camera.dto';
import { CameraTypeDto } from './dtos/camera-type.dto';

@ApiTags('Authentication')
@Controller('camera')
export class CameraController {
  constructor(private cameraService: CameraService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  get() {
    return this.cameraService.getCamera();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  getCameraId(@Param() params) {
    return this.cameraService.getCameraId(params.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: Camera })
  @Post()
  async postCamera(@Body() cameraDto: CameraDto) {
    let camera = await this.cameraService.generateURL(cameraDto);
    return this.cameraService.createCamera(camera);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put()
  async updateCamera(@Body() cameraDto: CameraDto) {
    let camera = await this.cameraService.generateURL(cameraDto);
    return this.cameraService.updateCamera(camera);
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
  @Get('type')
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
