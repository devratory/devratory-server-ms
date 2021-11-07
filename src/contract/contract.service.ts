import { BaseService } from '@ekhmoi/core-ms';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Contract } from './contract.model';

@Injectable()
export class ContractService extends BaseService<Contract> {
  constructor(@InjectModel(Contract.modelName) protected readonly model: ReturnModelType<typeof Contract>) {
    super(model);
  }
}
