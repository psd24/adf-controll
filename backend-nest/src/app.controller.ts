import { Controller, Request, Post, UseGuards, Get, UnauthorizedException, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LoginDto } from './users/dtos/login.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { RegisterUserDto } from './users/dtos/register-user.dto';
import { User } from './entities/user.entity';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

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

  @ApiOkResponse({ type: User })
  @Post('register')
  async register(@Body() registerDto: RegisterUserDto): Promise<User> {
    return this.authService.register(registerDto);
  }
  
  @Get()
  async hello() {
    return 'Hello, world!';
  }
}
