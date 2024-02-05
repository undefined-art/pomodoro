import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput): Promise<any> {
    // TODO: unique username message
    return await this.prismaService.user.create({
      data,
    });
  }

  async updateUser(id: number, data: Record<string, string>): Promise<any> {
    return await this.prismaService.user.update({
      where: { id },
      data,
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
}
