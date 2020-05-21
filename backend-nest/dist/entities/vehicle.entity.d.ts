import { Organization } from './organization.entity';
import { UserEvent } from "./user-event.entity";
export declare class Vehicle {
    id: number;
    name: string;
    type: string;
    code: string;
    organization: Organization;
    events: UserEvent[];
    constructor(name: string);
}
