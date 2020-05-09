import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository, getConnection } from 'typeorm';
import { RegisterUserDto } from './dtos/register-user.dto';
import { Organization } from 'src/entities/organization.entity';
import { Role } from 'src/entities/role.entity';

@Injectable()
export class UsersService {
    private readonly users: User[];

    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Role)
        private readonly rolesRepository: Repository<Role>,
        @InjectRepository(Organization)
        private readonly organizationsRepository: Repository<Organization>,
    ) {}

    async findByEmail(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({
            relations: ['role', 'organization'],
            where: {
                email,
            },
        });
    }

    async register(userDto: RegisterUserDto): Promise<User> {
        const user = await this.findByEmail(userDto.email);
        /*if (user) {
            throw new BadRequestException('User already registered.');
        }*/

        const newUser = new User();
        newUser.email = userDto.email;
        newUser.name = userDto.name;
        newUser.code = userDto.code;
        newUser.password = userDto.password;

        newUser.role = await this.rolesRepository.findOne({ id: userDto.role });
        if (!newUser.role) {
            throw new BadRequestException('Invalid role id.');
        }

        newUser.organization = await this.organizationsRepository.findOne({
            id: userDto.organization,
        });
        if (!newUser.organization) {
            throw new BadRequestException('Invalid organization id.');
        }
        return this.usersRepository.save(newUser);
    }

    async update(user: User) {
        
        return await getConnection().createQueryBuilder().update(User).set(user).where("id = :id", { id: user.id }).execute();
        //return this.rolesRepository.save(user)
    }

    async delete(user: User) {
        return this.usersRepository.delete(user);
    }

    async getUsers() {
        return this.usersRepository.find({ 
            relations: ['role', 'organization'],
        });
    }

    async getUser(_id: number) {
        return this.usersRepository.findOne({
            where: [{ "id": _id }],
            relations: ['role', 'organization'],
        });
    }

    async addRoles(roleNames: string[]): Promise<Role[]> {
        return this.rolesRepository.save(roleNames.map(r => new Role(r)));
    }

    async addOrganizations(
        organizationNames: string[],
    ): Promise<Organization[]> {
        return this.organizationsRepository.save(
            organizationNames.map(o => new Organization(o)),
        );
    }

    async roleCount(): Promise<number> {
        return this.rolesRepository.count();
    }

    async organizationsCount(): Promise<number> {
        return this.organizationsRepository.count();
    }

    async usersCount(): Promise<number> {
        return this.usersRepository.count();
    }
}
