import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthService } from 'src/auth/auth.service';

describe('TasksController', () => {
  let controller: TasksController;
  let service: {
    createTask: jest.Mock;
    getAllTasks: jest.Mock;
    getProjectTasks: jest.Mock;
    getTaskById: jest.Mock;
    updateTask: jest.Mock;
    deleteTask: jest.Mock;
  };

  beforeEach(async () => {
    service = {
      createTask: jest.fn(),
      getAllTasks: jest.fn(),
      getProjectTasks: jest.fn(),
      getTaskById: jest.fn(),
      updateTask: jest.fn(),
      deleteTask: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        { provide: TasksService, useValue: service },
        AuthGuard,
        {
          provide: AuthService,
          useValue: { verifyToken: jest.fn(async () => true) },
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('creates a task with createdBy from the session', async () => {
    service.createTask.mockResolvedValue({ id: 1 });
    const dto = { title: 'Write report', projectId: 10 };

    await controller.createTask(dto as any, { clientId: 5 } as any);

    expect(service.createTask).toHaveBeenCalledWith({
      ...dto,
      createdBy: 5,
    });
  });

  it('returns all tasks', async () => {
    service.getAllTasks.mockResolvedValue([{ id: 1 }]);

    const result = await controller.getAllTasks();

    expect(service.getAllTasks).toHaveBeenCalled();
    expect(result).toEqual([{ id: 1 }]);
  });

  it('returns tasks for a project', async () => {
    service.getProjectTasks.mockResolvedValue([{ id: 1 }]);

    await controller.getSpecificProjectTasks(10);

    expect(service.getProjectTasks).toHaveBeenCalledWith(10);
  });

  it('returns a single task', async () => {
    service.getTaskById.mockResolvedValue({ id: 1 });

    await controller.getTaskById(1);

    expect(service.getTaskById).toHaveBeenCalledWith(1);
  });

  it('updates a task', async () => {
    service.updateTask.mockResolvedValue({ id: 1, completed: true });

    await controller.updateTask(1, { completed: true } as any);

    expect(service.updateTask).toHaveBeenCalledWith(1, { completed: true });
  });

  it('deletes a task', async () => {
    service.deleteTask.mockResolvedValue({ id: 1 });

    await controller.deleteTask(1);

    expect(service.deleteTask).toHaveBeenCalledWith(1);
  });
});
