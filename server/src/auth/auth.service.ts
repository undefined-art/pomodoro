import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      return null;
    }

    const isValid = await this.validatePassword(user, password);

    if (isValid) {
      return user;
    }

    return null;
  }

  async login(
    user: any,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const { username, id } = user;
    const payload = { username, sub: id };

    const { access_token, refresh_token } = await this.updateTokens(
      id,
      payload,
    );

    return {
      access_token,
      refresh_token,
    };
  }

  async logout(userId: number) {
    return this.usersService.updateUser(userId, { hashRt: null });
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    const { hash } = user;

    return bcrypt.compare(password, hash);
  }

  async refreshTokens(userId: number, reqToken: string) {
    const user = await this.usersService.findById(userId);

    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const isValid = await this.jwtService.verifyAsync(user.refreshToken, {
      secret: process.env.REFRESH_TOKEN_SECRET,
    });

    if (!isValid) {
      throw new ForbiddenException('Access Denied');
    }

    console.log(user.refreshToken, reqToken);
    const refreshTokenMatches = user.refreshToken === reqToken;

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const { username, id } = user;
    const payload = { username, sub: id };

    const { access_token } = await this.updateTokens(id, payload);

    return {
      access_token,
    };
  }

  async generateHash(payload: string): Promise<string> {
    return await bcrypt.hash(payload, 12);
  }

  async updateTokens(id: number, payload: any) {
    const refreshToken = await this.generateRefreshToken(payload);
    const accessToken = await this.generateAccessToken(payload);
    await this.updateRefreshToken(id, refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async generateAccessToken(payload: any): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: '1m',
    });
  }

  async generateRefreshToken(payload: any): Promise<string> {
    return await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: '7d',
    });
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    await this.usersService.updateUser(userId, { refreshToken });
  }

  async verifyToken(token: string) {
    return await this.jwtService.verifyAsync(token, {
      secret: process.env.ACCESS_TOKEN_SECRET,
    });
  }
}
