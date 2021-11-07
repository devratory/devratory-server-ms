import { MSResponse } from '@ekhmoi/core-ms';
import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Contract } from './contract.model';
import { ContractService } from './contract.service';

@Controller('contracts')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @MessagePattern('@contract/create')
  async create(params: Contract): Promise<MSResponse<Contract>> {
    try {
      const contract = await this.contractService.create(params);
      return new MSResponse(HttpStatus.CREATED, '@contract/create_success', contract);
    } catch (e) {
      console.error(e);
      return new MSResponse(HttpStatus.PRECONDITION_FAILED, 'contract_create_precondition_failed', null, e.errors);
    }
  }

  @MessagePattern('@contract/get_all')
  async get(): Promise<MSResponse<Contract[]>> {
    try {
      const filter = {
        hidden: false,
      };
      const contracts = await this.contractService.findAllAsync(filter);
      return new MSResponse(HttpStatus.OK, 'success', contracts);
    } catch (e) {
      console.error(e);
      return new MSResponse(HttpStatus.INTERNAL_SERVER_ERROR, '', null, e.errors);
    }
  }

  @MessagePattern('@contract/update')
  async contractUpdateById({ contract, id }: { contract: Partial<Contract>; id: string; userId: string }): Promise<MSResponse<Contract>> {
    if (!contract || !id) return new MSResponse(HttpStatus.BAD_REQUEST, '@contract/update_by_id_failed', null, ['Missing parameters']);

    const exists = await this.contractService.findById(id);

    if (!exists) return new MSResponse(HttpStatus.NOT_FOUND, '@contract/update_by_id_failed', null, ['Contract record does not exist']);

    try {
      const updatedContract = Object.assign(exists, contract);
      return new MSResponse(HttpStatus.OK, '@contract/update_by_id_success', updatedContract);
    } catch (e) {
      return new MSResponse(HttpStatus.INTERNAL_SERVER_ERROR, 'contract.contractUpdateById.success', null, e.errors);
    }
  }

  @MessagePattern('@contract/delete_by_id')
  async delete({ id }: { id: string }): Promise<MSResponse<void>> {
    const exists = await this.contractService.findById(id);

    if (!exists) return new MSResponse(HttpStatus.NOT_FOUND, 'notFound', null, ['Contract not found']);
    return new MSResponse(HttpStatus.NO_CONTENT, 'contract.delete.success', null);
  }
}
