import { Test, TestingModule } from '@nestjs/testing';
import { CameraController } from './camera.controller';

describe('Camera Controller', () => {
  let controller: CameraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CameraController],
    }).compile();

    controller = module.get<CameraController>(CameraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
