import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { Item } from './item.model';
import { CoreMsModule } from '@ekhmoi/core-ms';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.ITEM_MONGO_URI, {
      useNewUrlParser: true,
      autoIndex: false,
    }),
    MongooseModule.forFeature([Item]),
    CoreMsModule.forRoot({ redisUrl: process.env.REDIS_URL }),
  ],
  providers: [ItemService],
  controllers: [ItemController],
})
export class ItemModule {}
