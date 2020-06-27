import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dtos/register-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { Organization } from 'src/entities/organization.entity';
import { Role } from 'src/entities/role.entity';
export declare class UsersService {
    private readonly usersRepository;
    private readonly rolesRepository;
    private readonly organizationsRepository;
    private readonly users;
    constructor(usersRepository: Repository<User>, rolesRepository: Repository<Role>, organizationsRepository: Repository<Organization>);
    findByEmail(email: string): Promise<User | undefined>;
    register(userDto: RegisterUserDto): Promise<User>;
    update(updateUserDto: UpdateUserDto): Promise<User>;
    saveTelegramUser(user: User): Promise<User>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<User>;
    delete(user: User): Promise<import("typeorm").DeleteResult>;
    getUsers(): Promise<User[]>;
    getUser(_id: number): Promise<User>;
    addRoles(roleNames: string[]): Promise<Role[]>;
    addOrganizations(organizationNames: string[]): Promise<Organization[]>;
    roleCount(): Promise<number>;
    organizationsCount(): Promise<number>;
    usersCount(): Promise<number>;
}
