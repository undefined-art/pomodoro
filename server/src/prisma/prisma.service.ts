// src/prisma/prisma.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService {
  readonly task: PrismaClient['task'];
  readonly user: PrismaClient['user'];

  constructor() {
    this.task = new PrismaClient().task;
    this.user = new PrismaClient().user;
  }
}
