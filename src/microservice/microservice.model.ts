import { BaseModel } from '@ekhmoi/core-ms';
import { prop } from '@typegoose/typegoose';
import { Connection } from 'mongoose';

export enum MicroserviceDefinitionType {
  String = 'string',
  Number = 'number',
  Array = 'array',
  Object = 'object',
  Boolean = 'boolean',
}

export class MicroserviceConnection {}

export class MicroserviceMethod {
  name: string;
  description?: string;
  connection: MicroserviceConnection;
  type?: string;
  pattern: string;
}

export class MicroserviceDefinition {
  @prop()
  properties: {
    [key: string]: MicroserviceDefinition;
  };
  @prop()

  type?: MicroserviceDefinitionType;

  @prop()
  format?: string;

  @prop()
  items?: MicroserviceDefinition;
  
  @prop()
  input: string; // definitionId

  @prop()
  output: string; // definitionId
}

export class Microservice extends BaseModel {
  @prop()
  connection: Connection;

  @prop() dockerImageUrl: string;

  @prop({required: true})
  name: string;

  @prop()
  contract: object;

  @prop({required: true})
  projectId: string;

  @prop({required: true})
  createdBy: string;
}
