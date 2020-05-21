import { OnModuleInit } from '@nestjs/common';
import { CameraService } from 'src/camera/camera.service';
import { Camera } from 'src/entities/camera.entity';
export declare class BotService implements OnModuleInit {
    private cameraService;
    constructor(cameraService: CameraService);
    onModuleInit(): void;
    getCamera(): Promise<{
        text: string;
        callback_data: number;
    }[]>;
    getImageUrl(id: any): Promise<Camera>;
    chunkArrayInGroups: (arr: any, size: any) => Promise<any[]>;
    getBotMessage(): Promise<void>;
}
