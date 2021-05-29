import { BaseService } from '@ekhmoi/core-ms';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Item } from './item.model';

@Injectable()
export class ItemService extends BaseService<Item> {
  constructor(@InjectModel(Item.modelName) protected readonly model: ReturnModelType<typeof Item>) {
    super(model);
  }
}
