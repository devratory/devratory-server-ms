import { MSResponse } from '@ekhmoi/core-ms';
import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Workflow } from './workflow.model';
import { WorkflowService } from './workflow.service';

@Controller('workflows')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @MessagePattern('@workflow/create')
  async create(params: Workflow): Promise<MSResponse<Workflow>> {
    try {
      const workflow = await this.workflowService.create(params);
      return new MSResponse(HttpStatus.CREATED, '@workflow/create_success', workflow);
    } catch (e) {
      console.error(e);
      return new MSResponse(HttpStatus.PRECONDITION_FAILED, 'task_create_precondition_failed', null, e.errors);
    }
  }

  @MessagePattern('@workflow/get_all')
  async get(): Promise<MSResponse<Workflow[]>> {
    try {
      const filter = {
        hidden: false,
      };
      const workflows = await this.workflowService.findAllAsync(filter);
      return new MSResponse(HttpStatus.OK, 'success', workflows);
    } catch (e) {
      console.error(e);
      return new MSResponse(HttpStatus.INTERNAL_SERVER_ERROR, '', null, e.errors);
    }
  }

  @MessagePattern('@workflow/update')
  async workflowUpdateById({ workflow, id }: { workflow: Partial<Workflow>; id: string; userId: string }): Promise<MSResponse<Workflow>> {
    if (!workflow || !id) return new MSResponse(HttpStatus.BAD_REQUEST, '@workflow/update_by_id_failed', null, ['Missing parameters']);

    const exists = await this.workflowService.findById(id);

    if (!exists) return new MSResponse(HttpStatus.NOT_FOUND, '@workflow/update_by_id_failed', null, ['Workflow record does not exist']);

    try {
      const updatedWorkflow = Object.assign(exists, workflow);
      return new MSResponse(HttpStatus.OK, '@workflow/update_by_id_success', updatedWorkflow);
    } catch (e) {
      return new MSResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'workflow.workflowUpdateById.success', null, e.errors);
    }
  }

  @MessagePattern('@workflow/delete_by_id')
  async delete({ id }: { id: string }): Promise<MSResponse<void>> {
    const exists = await this.workflowService.findById(id);

    if (!exists) return new MSResponse(HttpStatus.NOT_FOUND, 'notFound', null, ['Workflow not found']);
    return new MSResponse(HttpStatus.NO_CONTENT, 'workflow.delete.success', null);
  }
}
