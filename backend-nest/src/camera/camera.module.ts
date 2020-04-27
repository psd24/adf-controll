import { Module } from '@nestjs/common';
import { CameraService } from './camera.service';
import { CameraController } from './camera.controller';
import { Camera } from '../entities/camera.entity';
import { CameraType } from '../entities/camera-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [CameraService],
  imports: [
    TypeOrmModule.forFeature([Camera, CameraType])
  ],
  controllers: [CameraController]
})
export class CameraModule {}
