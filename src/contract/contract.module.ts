import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { Contract } from './contract.model';

@Module({
  imports: [MongooseModule.forFeature([Contract])],
  providers: [ContractService],
  controllers: [ContractController],
})
export class ContractModule {}
