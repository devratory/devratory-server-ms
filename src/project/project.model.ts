import { BaseModel } from '@ekhmoi/core-ms';
import { prop } from '@typegoose/typegoose';

export enum EnvironmentTag {
  Production = 'prod',
  Staging = 'stag',
  Testing = 'test',
  Development = 'dev',
}
export class Project extends BaseModel {
  /**
 * @xample of typegoose props()
 * 
      @prop() icon: string;
 */
  @prop({ required: true })
  name: string;

  @prop({ required: true, enum: EnvironmentTag })
  environmentTag: EnvironmentTag;

  @prop({ required: true })
  createdBy: string;
}
