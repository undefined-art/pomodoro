import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectCreateDto } from './dto/project-create.dto';
import { ProjectUpdateDto } from './dto/project-update.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createProject(project: ProjectCreateDto) {
    return this.prismaService.project.create({
      data: project,
    });
  }

  async getUserProjects(id: number) {
    return this.prismaService.project.findMany({ where: { createdBy: id } });
  }

  async getProjectById(id: number) {
    const project = await this.prismaService.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async updateProject(id: number, updatedProject: ProjectUpdateDto) {
    const existingProject = await this.getProjectById(id);

    if (!existingProject) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return this.prismaService.project.update({
      where: { id },
      data: updatedProject,
    });
  }

  async deleteProject(id: number) {
    const existingProject = await this.getProjectById(id);

    if (!existingProject) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return this.prismaService.project.delete({
      where: { id },
    });
  }
}
