import { MSResponse } from '@ekhmoi/core-ms';
import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Project } from './project.model';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @MessagePattern('@project/create')
  async create(params: Project): Promise<MSResponse<Project>> {
    try {
      const project = await this.projectService.create(params);
      return new MSResponse(HttpStatus.CREATED, '@project/create_success', project);
    } catch (e) {
      console.error(e);
      return new MSResponse(HttpStatus.PRECONDITION_FAILED, 'task_create_precondition_failed', null, e.errors);
    }
  }

  @MessagePattern('@project/get_all')
  async get(filters: any): Promise<MSResponse<Project[]>> {
    try {
      const projects = await this.projectService.findAllAsync(filters);
      return new MSResponse(HttpStatus.OK, 'success', projects);
    } catch (e) {
      console.error(e);
      return new MSResponse(HttpStatus.INTERNAL_SERVER_ERROR, '', null, e.errors);
    }
  }

  @MessagePattern('@project/update')
  async projectUpdateById({ project, id }: { project: Partial<Project>; id: string; userId: string }): Promise<MSResponse<Project>> {
    if (!project || !id) return new MSResponse(HttpStatus.BAD_REQUEST, '@project/update_by_id_failed', null, ['Missing parameters']);

    const exists = await this.projectService.findById(id);

    if (!exists) return new MSResponse(HttpStatus.NOT_FOUND, '@project/update_by_id_failed', null, ['Project record does not exist']);

    try {
      const updatedProject = Object.assign(exists, project);
      return new MSResponse(HttpStatus.OK, '@project/update_by_id_success', updatedProject);
    } catch (e) {
      return new MSResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'project.projectUpdateById.success', null, e.errors);
    }
  }

  @MessagePattern('@project/delete_by_id')
  async delete({ id }: { id: string }): Promise<MSResponse<void>> {
    const exists = await this.projectService.findById(id);

    if (!exists) return new MSResponse(HttpStatus.NOT_FOUND, 'notFound', null, ['Project not found']);
    return new MSResponse(HttpStatus.NO_CONTENT, 'project.delete.success', null);
  }
}
