import { BaseService } from '@ekhmoi/core-ms';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Project } from './project.model';

@Injectable()
export class ProjectService extends BaseService<Project> {
  constructor(@InjectModel(Project.modelName) protected readonly model: ReturnModelType<typeof Project>) {
    super(model);
  }
}
