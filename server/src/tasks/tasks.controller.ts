import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Session,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

import { AuthGuard } from 'src/guards/auth.guard';
import { TaskCreateDto } from './dto/task-create.dto';
import { TaskUpdateDto } from './dto/task-update.dto';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  createTask(
    @Body() createTaskDto: TaskCreateDto,
    @Session() session: Record<string, number>,
  ) {
    return this.tasksService.createTask({
      ...createTaskDto,
      createdBy: session.clientId,
    });
  }

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get('/project/:id')
  getSpecificProjectTasks(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.getProjectTasks(id);
  }

  @Get(':id')
  getTaskById(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.getTaskById(id);
  }

  @Put(':id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: TaskUpdateDto,
  ) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.deleteTask(id);
  }
}
