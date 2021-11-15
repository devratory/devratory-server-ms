import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CoreMsModule } from '@ekhmoi/core-ms';
import { ContractModule } from './contract/contract.module';
import { WorkflowModule } from './workflow/workflow.module';
import { ProjectModule } from './project/project.module';
import { MicroserviceModule } from './microservice/microservice.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DEVLAB_MONGO_URI, {
      useNewUrlParser: true,
      autoIndex: false,
    }),
    CoreMsModule.forRoot({ redisUrl: process.env.REDIS_URL }),
    ContractModule,
    WorkflowModule,
    ProjectModule,
    MicroserviceModule
  ],
})
export class AppModule {}
