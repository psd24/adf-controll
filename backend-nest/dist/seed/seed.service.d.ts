import { UsersService } from 'src/users/users.service';
export declare class SeedService {
    private usersService;
    constructor(usersService: UsersService);
    start(): Promise<void>;
}
