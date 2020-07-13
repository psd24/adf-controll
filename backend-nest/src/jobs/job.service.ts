import {Injectable} from '@nestjs/common';

const CronJob = require("cron").CronJob;
import * as imp from 'instagram-private-api'
import {get} from 'request-promise'; // request is already declared as a dependency of the library
import {AppConfig} from "../app.config";
import {CameraService} from "../camera/camera.service";
import {Camera} from "../entities/camera.entity";

@Injectable()
export class JobService {

    constructor(private  cameraService: CameraService) {
    }


    startJob = async () => {
        const job = new CronJob("0 0 * * * *", () => {
            let hour = Math.floor(Math.random() * (22 - 8 + 1) + 8)
            if (hour >= 8 || hour <= 22) {
                this.runRandomJob(hour)
            }
        });
        job.start();

    }


    getImage = async () => {
        const camera: Camera = await this.cameraService.getRandomActiveCamera()
        return camera.url

    }


    sendImage = async () => {
        const ig = new imp.IgApiClient();
        ig.state.generateDevice(AppConfig.instagramUsername);

        const loggedInUser = await ig.account.login(AppConfig.instagramUsername, AppConfig.instagramPassword);
        console.log(loggedInUser)
        // getting random square image from internet as a Buffer
        const imageBuffer = await get({
            url: await this.getImage(), // random picture with 800x800 size
            encoding: null, // this is required, only this way a Buffer is returned
        });

        const publishResult = await ig.publish.photo({
            file: imageBuffer, // image buffer, you also can specify image from your disk using fs
            // caption: 'Really nice photo from the internet! 💖', // nice caption (optional)
        });

        console.log(`published result`,publishResult)

       await ig.account.logout()


    }


    runRandomJob = async (hour: number) => {

        const job = new CronJob(`* * ${hour} * * *`, () => {
            this.sendImage();

        });
        await job.stop();
        job.start();
    }
}
