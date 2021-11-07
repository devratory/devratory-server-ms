import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ContractModule } from './contract/contract.module';
import { metadataExtractor } from './meta-extractor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      host: '0.0.0.0',
      port: +process.env.DEVLAB_PORT,
      url: process.env.REDIS_URL,
    },
  });
  
  const data = await metadataExtractor(AppModule);
  for await (const messagePattern of data) {
    console.log(messagePattern);
  }
  await app.startAllMicroservicesAsync();
  await app.listenAsync(+process.env.DEVLAB_PORT);
}
bootstrap();
