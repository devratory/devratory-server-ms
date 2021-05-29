import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ItemModule } from './item.module';

async function bootstrap() {
  const app = await NestFactory.create(ItemModule);
  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      host: '0.0.0.0',
      port: +process.env.ITEM_PORT,
      url: process.env.REDIS_URL,
    },
  });
  await app.startAllMicroservicesAsync();
  await app.listenAsync(+process.env.ITEM_PORT);
}
bootstrap();
