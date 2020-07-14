import { Module } from '@nestjs/common';
import { CameraService } from './camera.service';
import { CameraController } from './camera.controller';
import { Camera } from '../entities/camera.entity';
import { CameraType } from '../entities/camera-type.entity';
import { Organization } from '../entities/organization.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UsersModule} from "../users/users.module";
import {User} from "../entities/user.entity";
import {CameraUser} from "../entities/cameraUser.entity";

@Module({
  providers: [CameraService],
  imports: [
    TypeOrmModule.forFeature([Camera, CameraType, Organization, User,CameraUser])
  ],
  controllers: [CameraController],
  exports:[CameraService]
})
export class CameraModule {}
