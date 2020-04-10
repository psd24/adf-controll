import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

const roleNames = ['admin', 'customer'];
const organizationNames = ['google', 'microsoft', 'apple'];
const defaultPassword = 'password';

@Injectable()
export class SeedService {
    constructor(
        private usersService: UsersService,
    ) {}

    async start() {
        const admin = await this.usersService.findByEmail('admin@admin.com');
        if (!admin) {
            const roles = await this.usersService.addRoles(roleNames);
            const organizations = await this.usersService.addOrganizations(organizationNames);
            await this.usersService.register({
                name: 'admin',
                email: 'admin@admin.com',
                role: roles[0].id,
                organization: organizations[0].id,
                password: defaultPassword,
            });
    
        }
    }
}
