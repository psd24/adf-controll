import { User } from "./user.entity";
import { Vehicle } from "./vehicle.entity";
import { Camera } from "./camera.entity";
import { UserEvent } from "./user-event.entity";
export declare class Organization {
    id: number;
    name: string;
    code: string;
    users: User[];
    vehicle: Vehicle[];
    camera: Camera[];
    events: UserEvent[];
    constructor(name: string);
}
