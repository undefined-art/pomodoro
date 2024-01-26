// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client'; // Import the User model from Prisma
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<any> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return await this.prismaService.user.create({
      data: { ...data, password: hashedPassword },
    });
  }

  async findUserByEmail(email: string): Promise<any | null> {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async findById(userId: number): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { id: userId },
    });
  }

  async validatePassword(user: any, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }
}
