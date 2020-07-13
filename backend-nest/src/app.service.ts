import {Injectable, OnModuleInit} from '@nestjs/common';
import {CameraService} from "./camera/camera.service";

@Injectable()
export class AppService {
  constructor() {
  }
  getHello(): string {
    return 'Hello World!';
  }
}
