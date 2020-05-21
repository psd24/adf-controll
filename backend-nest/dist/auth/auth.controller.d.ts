import { LoginDto } from 'src/users/dtos/login.dto';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from 'src/entities/user.entity';
import { RegisterUserDto } from 'src/users/dtos/register-user.dto';
import { UpdateUserDto } from 'src/users/dtos/update-user.dto';
import { ResetPasswordDto } from 'src/users/dtos/reset-password.dto';
export declare class AuthController {
    private authService;
    private usersService;
    constructor(authService: AuthService, usersService: UsersService);
    login(body: LoginDto): Promise<{
        accessToken: string;
        role: any;
    }>;
    getProfile(req: any): any;
    register(registerDto: RegisterUserDto): Promise<User>;
    update(updateUserDto: UpdateUserDto): Promise<User>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<User>;
    userCount(): Promise<number>;
    userGet(): Promise<User[]>;
    userIdGet(params: any): Promise<User>;
    userDelete(params: any): Promise<import("typeorm").DeleteResult>;
}
