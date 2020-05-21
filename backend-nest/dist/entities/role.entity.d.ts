import { User } from "./user.entity";
export declare class Role {
    id: number;
    name: string;
    users: User[];
    constructor(name: string);
}
