import { Controller, Post, Body, Req, Session, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { Request, Response } from 'express';

@Controller('auth/local')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(
    @Body() body: { username: string; email: string; password: string },
  ) {
    const { email, password, username } = body;
    const existingUser = await this.usersService.findUserByEmail(email);

    if (existingUser) {
      return { message: 'User already exists' };
    }

    const hash = await this.authService.generateHash(password);
    await this.usersService.createUser({ email, username, hash });

    return { message: 'User registered successfully' };
  }

  @Post('login')
  async login(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
    @Session() session: Record<string, string>,
  ) {
    const { email, password } = request.body;
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      return { message: 'Invalid credentials' };
    }

    const { id } = user;
    session.clientId = id;

    const { access_token, refresh_token } = await this.authService.login(user);

    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
    });

    return { message: 'Login successful', access_token };
  }

  @Post('refresh-token')
  async refresh(@Req() request: Request) {
    const { id } = request.body;
    const refreshToken = request.cookies['refresh_token'];

    await this.authService.refreshTokens(id, refreshToken);

    return { message: 'Refresh successful' };
  }
}
