import { Module} from '@nestjs/common';
import {JobService} from "./job.service";
import {CameraModel} from "../../../app/src/app/models/camera.model";

@Module({
    imports:[CameraModel],
    providers: [JobService],
    exports: [JobService]
})
export class JobModule {}
