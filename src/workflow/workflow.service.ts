import { BaseService } from '@ekhmoi/core-ms';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Workflow } from './workflow.model';

@Injectable()
export class WorkflowService extends BaseService<Workflow> {
  constructor(@InjectModel(Workflow.modelName) protected readonly model: ReturnModelType<typeof Workflow>) {
    super(model);
  }
}
