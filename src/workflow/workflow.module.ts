import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { WorkflowService } from './workflow.service';
import { WorkflowController } from './workflow.controller';
import { Workflow } from './workflow.model';

@Module({
  imports: [MongooseModule.forFeature([Workflow])],
  providers: [WorkflowService],
  controllers: [WorkflowController],
})
export class WorkflowModule {}
