// src/tasks/tasks.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task/create-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTask(createTaskDto: CreateTaskDto) {
    return this.prismaService.task.create({
      data: createTaskDto,
    });
  }

  async getAllTasks() {
    return this.prismaService.task.findMany();
  }

  async getTaskById(id: number) {
    const task = await this.prismaService.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async updateTask(id: number, updateTaskDto: CreateTaskDto) {
    const existingTask = await this.getTaskById(id);

    if (!existingTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return this.prismaService.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async deleteTask(id: number) {
    const existingTask = await this.getTaskById(id);

    if (!existingTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return this.prismaService.task.delete({
      where: { id },
    });
  }
}
