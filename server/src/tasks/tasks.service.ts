import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TaskCreateDto } from './dto/task-create.dto';
import { TaskUpdateDto } from './dto/task-update.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async createTask(task: TaskCreateDto) {
    const { projectId, ...taskData } = task;
    
    return this.prismaService.task.create({
      data: {
        ...taskData,
        projectId,
      },
    });
  }

  async getAllTasks() {
    return this.prismaService.task.findMany({ include: { project: true } });
  }

  async getProjectTasks(projectId: number) {
    return this.prismaService.task.findMany({
      where: { projectId },
    });
  }

  async getTaskById(taskId: number) {
    const task = await this.prismaService.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    return task;
  }

  async updateTask(id: number, updatedTask: TaskUpdateDto) {
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
