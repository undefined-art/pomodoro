import {
  Controller,
  Post,
  Body,
  Req,
  Session,
  Res,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { Request, Response } from 'express';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth/local')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(
    @Body() body: UserRegisterDto,
    @Res({ passthrough: true }) response: Response,
    @Session() session: Record<string, string>,
  ) {
    const { email, password, username } = body;

    // Check if user already exists
    const existingUser = await this.usersService.findUserByEmail(email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists', {
        cause: new Error(),
        description: 'User with this email already exists',
      });
    }

    const hash = await this.authService.generateHash(password);
    const user = await this.usersService.createUser({ email, username, hash });

    // Set session
    session.clientId = user.id;

    // Generate tokens
    const { access_token, refresh_token } = await this.authService.login(user);

    // Set refresh token cookie
    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
    });

    return { 
      message: 'User registered successfully', 
      access_token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      }
    };
  }

  @Post('login')
  async login(
    @Body() body: UserLoginDto,
    @Res({ passthrough: true }) response: Response,
    @Session() session: Record<string, string>,
  ) {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new BadRequestException('Invalid credentials', {
        cause: new Error(),
        description: 'Invalid credentials',
      });
    }

    const { id } = user;
    session.clientId = id;

    const { access_token, refresh_token } = await this.authService.login(user);

    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
    });

    return { 
      message: 'Login successful', 
      access_token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      }
    };
  }

  @Post('refresh-token')
  async refresh(@Body() body: RefreshTokenDto, @Req() request: Request) {
    const { id } = body;
    const refreshToken = request.cookies['refresh_token'];

    await this.authService.refreshTokens(id, refreshToken);

    return { message: 'Token refresh successful' };
  }
}
