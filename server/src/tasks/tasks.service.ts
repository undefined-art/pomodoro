import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskModificationDto } from './dto/task-modification.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTask(task: TaskModificationDto) {
    return this.prismaService.task.create({
      data: task,
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

  async updateTask(id: number, updatedTask: TaskModificationDto) {
    const existingTask = await this.getTaskById(id);

    if (!existingTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return this.prismaService.task.update({
      where: { id },
      data: updatedTask,
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
