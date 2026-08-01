import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('TasksService', () => {
  let service: TasksService;
  let prisma: {
    task: {
      create: jest.Mock;
      findMany: jest.Mock;
      findUnique: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };

  const mockTask = {
    id: 1,
    title: 'Write report',
    completed: false,
    projectId: 10,
    createdBy: 1,
  };

  beforeEach(async () => {
    prisma = {
      task: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates a task with its project relation', async () => {
    prisma.task.create.mockResolvedValue(mockTask);
    const expiredAt = new Date('2026-01-01T00:00:00.000Z');

    const result = await service.createTask({
      title: 'Write report',
      projectId: 10,
      createdBy: 1,
      completed: false,
      pomodoro: 1,
      expiredAt,
    });

    expect(prisma.task.create).toHaveBeenCalledWith({
      data: {
        title: 'Write report',
        projectId: 10,
        createdBy: 1,
        completed: false,
        pomodoro: 1,
        expiredAt,
      },
    });
    expect(result).toEqual(mockTask);
  });

  it('lists all tasks including their project', async () => {
    prisma.task.findMany.mockResolvedValue([mockTask]);

    const result = await service.getAllTasks();

    expect(prisma.task.findMany).toHaveBeenCalledWith({
      include: { project: true },
    });
    expect(result).toEqual([mockTask]);
  });

  it('lists tasks for a specific project', async () => {
    prisma.task.findMany.mockResolvedValue([mockTask]);

    const result = await service.getProjectTasks(10);

    expect(prisma.task.findMany).toHaveBeenCalledWith({
      where: { projectId: 10 },
    });
    expect(result).toEqual([mockTask]);
  });

  it('returns a task by id', async () => {
    prisma.task.findUnique.mockResolvedValue(mockTask);

    const result = await service.getTaskById(1);

    expect(prisma.task.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
    expect(result).toEqual(mockTask);
  });

  it('throws NotFoundException when a task does not exist', async () => {
    prisma.task.findUnique.mockResolvedValue(null);

    await expect(service.getTaskById(999)).rejects.toThrow(NotFoundException);
  });

  it('updates a task when it exists', async () => {
    prisma.task.findUnique.mockResolvedValue(mockTask);
    prisma.task.update.mockResolvedValue({ ...mockTask, completed: true });

    const result = await service.updateTask(1, {
      title: 'Write report',
      projectId: 10,
      completed: true,
    });

    expect(prisma.task.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { title: 'Write report', projectId: 10, completed: true },
    });
    expect(result.completed).toBe(true);
  });

  it('throws NotFoundException when updating a missing task', async () => {
    prisma.task.findUnique.mockResolvedValue(null);

    await expect(
      service.updateTask(999, {
        title: 'Write report',
        projectId: 10,
        completed: true,
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('deletes a task when it exists', async () => {
    prisma.task.findUnique.mockResolvedValue(mockTask);
    prisma.task.delete.mockResolvedValue(mockTask);

    const result = await service.deleteTask(1);

    expect(prisma.task.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(mockTask);
  });

  it('throws NotFoundException when deleting a missing task', async () => {
    prisma.task.findUnique.mockResolvedValue(null);

    await expect(service.deleteTask(999)).rejects.toThrow(NotFoundException);
  });
});
