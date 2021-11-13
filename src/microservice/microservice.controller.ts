import { MSResponse } from '@ekhmoi/core-ms';
import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Microservice } from './microservice.model';
import { MicroserviceService } from './microservice.service';

@Controller('microservices')
export class MicroserviceController {
  constructor(private readonly microserviceService: MicroserviceService) {}

  @MessagePattern('@microservice/create')
  async create(params: Microservice): Promise<MSResponse<Microservice>> {
    try {
      const microservice = await this.microserviceService.create(params);
      return new MSResponse(HttpStatus.CREATED, '@microservice/create_success', microservice);
    } catch (e) {
      console.error(e);
      return new MSResponse(HttpStatus.PRECONDITION_FAILED, 'task_create_precondition_failed', null, e.errors);
    }
  }

  @MessagePattern('@microservice/get_all')
  async get(filters): Promise<MSResponse<Microservice[]>> {
    try {
      const microservices = await this.microserviceService.findAllAsync(filters || {});
      return new MSResponse(HttpStatus.OK, 'success', microservices);
    } catch (e) {
      console.error(e);
      return new MSResponse(HttpStatus.INTERNAL_SERVER_ERROR, '', null, e.errors);
    }
  }

  @MessagePattern('@microservice/update')
  async microserviceUpdateById({ microservice, id }: { microservice: Partial<Microservice>; id: string; userId: string }): Promise<MSResponse<Microservice>> {
    console.log('Updateing microservice', id, microservice);
    if (!microservice || !id) return new MSResponse(HttpStatus.BAD_REQUEST, '@microservice/update_by_id_failed', null, ['Missing parameters']);

    const exists = await this.microserviceService.findById(id);

    if (!exists) return new MSResponse(HttpStatus.NOT_FOUND, '@microservice/update_by_id_failed', null, ['Microservice record does not exist']);

    try {
      const updatedMicroservice = Object.assign(exists, microservice);
      await this.microserviceService.update(updatedMicroservice).exec();
      return new MSResponse(HttpStatus.OK, '@microservice/update_by_id_success', updatedMicroservice);
    } catch (e) {
      return new MSResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'microservice.microserviceUpdateById.success', null, e.errors);
    }
  }

  @MessagePattern('@microservice/delete_by_id')
  async delete({ id }: { id: string }): Promise<MSResponse<void>> {
    const exists = await this.microserviceService.findById(id);

    if (!exists) return new MSResponse(HttpStatus.NOT_FOUND, 'notFound', null, ['Microservice not found']);
    return new MSResponse(HttpStatus.NO_CONTENT, 'microservice.delete.success', null);
  }
}
