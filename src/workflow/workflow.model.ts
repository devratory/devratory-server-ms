import { BaseModel } from '@ekhmoi/core-ms';
import { prop } from '@typegoose/typegoose';

export interface ConnectionData {
  node: number;
  data: unknown;
}
export declare type InputConnectionData = ConnectionData & {
  output: string;
};
export declare type OutputConnectionData = ConnectionData & {
  input: string;
};
export interface InputData {
  connections: InputConnectionData[];
}
export interface OutputData {
  connections: OutputConnectionData[];
}
export interface InputsData {
  [key: string]: InputData;
}
export interface OutputsData {
  [key: string]: OutputData;
}
export interface NodeData {
  id: number;
  name: string;
  inputs: InputsData;
  outputs: OutputsData;
  data: {
    [key: string]: unknown;
  };
  position: [number, number];
}
export interface NodesData {
  [id: string]: NodeData;
}

export class Workflow extends BaseModel {
  @prop()
  name: string;

  @prop()
  projectId: string;

  @prop()
  createdBy: string;

  @prop()
  url: string;

  @prop()
  httpMethod: 'post' | 'get' | 'put' | 'delete' | 'patch';

  @prop()
  nodes: NodesData;

  @prop()
  authWorkflow?: string;

  @prop()
  output: any;
}
