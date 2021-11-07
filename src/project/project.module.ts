import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Project } from './project.model';

@Module({
  imports: [MongooseModule.forFeature([Project])],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
