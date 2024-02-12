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
import { ProjectsService } from './projects.service';

import { AuthGuard } from 'src/guards/auth.guard';
import { ProjectCreateDto } from './dto/project-create.dto';
import { ProjectUpdateDto } from './dto/project-update.dto';

@Controller('projects')
@UseGuards(AuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  createProject(
    @Body() projectCreateDto: ProjectCreateDto,
    @Session() session: Record<string, number>,
  ) {
    return this.projectsService.createProject({
      ...projectCreateDto,
      createdBy: session.clientId,
    });
  }

  @Get(':id')
  getProjects(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.getUserProjects(id);
  }

  @Put(':id')
  updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() projectUpdateDto: ProjectUpdateDto,
  ) {
    return this.projectsService.updateProject(id, projectUpdateDto);
  }

  @Delete(':id')
  deleteProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.deleteProject(id);
  }
}
