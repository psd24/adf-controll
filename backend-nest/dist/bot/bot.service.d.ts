import { OnModuleInit } from '@nestjs/common';
import { CameraService } from 'src/camera/camera.service';
import { Camera } from 'src/entities/camera.entity';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
export declare class BotService implements OnModuleInit {
    private cameraService;
    private authService;
    private userService;
    private userSteps;
    private username;
    private password;
    private userToken;
    constructor(cameraService: CameraService, authService: AuthService, userService: UsersService);
    onModuleInit(): void;
    getCamera(): Promise<{
        text: string;
        callback_data: number;
    }[]>;
    getImageUrl(id: any): Promise<Camera>;
    chunkArrayInGroups: (arr: any, size: any) => Promise<any[]>;
    getBotMessage(): Promise<void>;
    checkLogin: (chatid: number) => Promise<"Your email or password does not exist" | "Waiting for authorization so you can use me">;
    isActiveUser: (chatId: number) => Promise<boolean>;
}
