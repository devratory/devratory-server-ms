import { BaseModel } from '@ekhmoi/core-ms';
import { Transport } from '@nestjs/microservices';
import { prop } from '@typegoose/typegoose';

class ContractDefinition {}
class ContractMethod {
  name: string;
  description: string;
  type: 'MessagePattern' | 'EventPattern';
  pattern: string;
  input?: string; // reference to definition
  output?: string; // reference to definition
}

export class Contract extends BaseModel {
  /**
 * @xample of typegoose props()
 * 
      @prop() icon: string;
 */
  @prop()
  name: string;

  @prop()
  version: string;

  @prop({ enum: Transport, required: true })
  transport: Transport;

  @prop({ type: Object })
  definitions: {
    [key: string]: ContractDefinition;
  };

  @prop()
  methods: ContractMethod[];

  @prop({ required: true })
  createdBy: string;
}
