import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MicroserviceService } from './microservice.service';
import { MicroserviceController } from './microservice.controller';
import { Microservice } from './microservice.model';

@Module({
  imports: [MongooseModule.forFeature([Microservice])],
  providers: [MicroserviceService],
  controllers: [MicroserviceController],
})
export class MicroserviceModule {}
