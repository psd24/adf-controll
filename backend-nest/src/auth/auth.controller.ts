import { Controller, Post, Body, UnauthorizedException, UseGuards, Get, Request, Param, Delete, Put } from '@nestjs/common';
import { LoginDto } from 'src/users/dtos/login.dto';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from 'src/entities/user.entity';
import { RegisterUserDto } from 'src/users/dtos/register-user.dto';
import { UpdateUserDto } from 'src/users/dtos/update-user.dto';
import { ResetPasswordDto } from 'src/users/dtos/reset-password.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) {}  

    @Post('login')
    async login(@Body() body: LoginDto) {
      const user = await this.authService.validateUser(body.email, body.password);
      if (!user) {
        throw new UnauthorizedException();
      }
      return this.authService.login(user);
    }
  
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
  
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: User })
    @Post('register')
    async register(@Body() registerDto: RegisterUserDto): Promise<User> {
      return this.authService.register(registerDto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: User })
    @Put('register/update')
    async update(@Body() updateUserDto: UpdateUserDto) {
      return this.usersService.update(updateUserDto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOkResponse({ type: User })
    @Put('register/resetpassword')
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
      return this.usersService.resetPassword(resetPasswordDto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('user/count')
    async userCount(): Promise<number> {
      return this.usersService.usersCount();
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('user')
    async userGet() {
      return this.usersService.getUsers();
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('user/:id')
    async userIdGet(@Param() params) {
      return this.usersService.getUser(params.id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete('user/delete/:id')
    async userDelete(@Param() params) {
      return this.usersService.delete(params.id);
    }
}
