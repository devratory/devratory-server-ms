import { BaseService } from '@ekhmoi/core-ms';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Microservice } from './microservice.model';

@Injectable()
export class MicroserviceService extends BaseService<Microservice> {
  constructor(@InjectModel(Microservice.modelName) protected readonly model: ReturnModelType<typeof Microservice>) {
    super(model);
  }
}
