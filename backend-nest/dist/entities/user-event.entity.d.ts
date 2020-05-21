import { User } from "./user.entity";
import { Vehicle } from './vehicle.entity';
import { Organization } from './organization.entity';
export declare class UserEvent {
    id: number;
    name: string;
    description: string;
    population: string;
    dateInit: Date;
    dateEnd: Date;
    users: User[];
    organization: Organization;
    vehicle: Vehicle[];
}
