import { Role } from './role.entity';
import { Organization } from './organization.entity';
import { UserEvent } from './user-event.entity';
export declare class User {
    id: number;
    name: string;
    email: string;
    code: string;
    organization: Organization;
    role: Role;
    events: UserEvent[];
    password: string;
    authorizeConnection: string;
    chatId: number;
    preProcess(): any;
}
