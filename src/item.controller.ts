import { MSResponse } from '@ekhmoi/core-ms';
import { Body, Controller, Get, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Item } from './item.model';
import { ItemService } from './item.service';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @MessagePattern('@item/create')
  async create(@Body() params: Item): Promise<MSResponse<Item>> {
    try {
      const item = await this.itemService.create(params);
      return new MSResponse(HttpStatus.CREATED, '@item/create_success', item);
    } catch (e) {
      console.error(e);
      return new MSResponse(HttpStatus.PRECONDITION_FAILED, 'task_create_precondition_failed', null, e.errors);
    }
  }

  @Get()
  @MessagePattern('@item/get_all')
  async get(): Promise<MSResponse<Item[]>> {
    try {
      const filter = {
        hidden: false,
      };
      const items = await this.itemService.findAllAsync(filter);
      return new MSResponse(HttpStatus.OK, 'success', items);
    } catch (e) {
      console.error(e);
      return new MSResponse(HttpStatus.INTERNAL_SERVER_ERROR, '', null, e.errors);
    }
  }

  @MessagePattern('@item/update')
  async itemUpdateById({ item, id }: { item: Partial<Item>; id: string; userId: string }): Promise<MSResponse<Item>> {
    if (!item || !id) return new MSResponse(HttpStatus.BAD_REQUEST, '@item/update_by_id_failed', null, ['Missing parameters']);

    const exists = await this.itemService.findById(id);

    if (!exists) return new MSResponse(HttpStatus.NOT_FOUND, '@item/update_by_id_failed', null, ['Item record does not exist']);

    try {
      const updatedItem = Object.assign(exists, item);
      return new MSResponse(HttpStatus.OK, '@item/update_by_id_success', updatedItem);
    } catch (e) {
      return new MSResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'item.itemUpdateById.success', null, e.errors);
    }
  }

  @MessagePattern('@item/delete_by_id')
  async delete({ id }: { id: string }): Promise<MSResponse<void>> {
    const exists = await this.itemService.findById(id);

    if (!exists) return new MSResponse(HttpStatus.NOT_FOUND, 'notFound', null, ['Item not found']);
    return new MSResponse(HttpStatus.NO_CONTENT, 'item.delete.success', null);
  }
}
