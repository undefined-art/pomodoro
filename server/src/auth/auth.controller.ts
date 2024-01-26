// src/auth/auth.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('register')
  async register(
    @Body() body: { username: string; email: string; password: string },
  ) {
    const { email } = body;
    const existingUser = await this.usersService.findUserByEmail(email);

    if (existingUser) {
      return { message: 'User already exists' };
    }

    await this.usersService.createUser(body);
    return { message: 'User registered successfully' };
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      return { message: 'Invalid credentials' };
    }

    // In a real-world scenario, generate a JWT token and return it in the response
    return { message: 'Login successful', user };
  }
}
