import {Injectable} from '@nestjs/common';
const CronJob = require("cron").CronJob;
import * as imp from 'instagram-private-api'
import { get } from 'request-promise'; // request is already declared as a dependency of the library
import  {AppConfig} from "../app.config";
import {CameraService} from "../camera/camera.service";

@Injectable()
export class JobService {




    startJob =async () => {
        const job = new CronJob("* * 1 * * *", () => {
            let hour = Math.floor(Math.random() * (22 - 8 + 1) + 8)
            if(hour>=8 || hour <= 22){
                this.sendImage(hour)
            }
        });
        job.start();

    }



    sendImage = async (hour: number) => {

        const ig = new imp.IgApiClient();
        ig.state.generateDevice(AppConfig.instagramUsername);

        const loggedInUser = await ig.account.login(AppConfig.instagramUsername, AppConfig.instagramPassword);
        console.log(loggedInUser)

        // const job = new CronJob(`* * ${hour} * * *`, () => {
        const job = new CronJob(`*/30 * * * * *`, async () => {
            // getting random square image from internet as a Buffer
            const imageBuffer = await get({
                url: 'https://pbs.twimg.com/profile_images/1045994211810541569/dou4dj4w_400x400.jpg', // random picture with 800x800 size
                encoding: null, // this is required, only this way a Buffer is returned
            });

            // const publishResult = await ig.publish.photo({
            //     file: imageBuffer, // image buffer, you also can specify image from your disk using fs
            //     caption: 'Really nice photo from the internet! 💖', // nice caption (optional)
            // });

            // console.log(publishResult); // publishResult.status should be "ok"


        });
        job.start();
    }
}
