import { Module} from '@nestjs/common';
import {JobService} from "./job.service";
import {CameraModule} from "../camera/camera.module";

@Module({
    imports:[CameraModule],
    providers: [JobService],
    exports: [JobService]
})
export class JobModule {}
