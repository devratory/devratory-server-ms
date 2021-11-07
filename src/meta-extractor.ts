import { ApplicationConfig, MetadataScanner, NestContainer } from '@nestjs/core';
import { InstanceLoader } from '@nestjs/core/injector/instance-loader';
import { DependenciesScanner } from '@nestjs/core/scanner';
import { PATTERN_HANDLER_METADATA } from '@nestjs/microservices/constants';
import { isUndefined } from '@nestjs/common/utils/shared.utils';
export async function* metadataExtractor<T>(module: any) {
  const container = new NestContainer(new ApplicationConfig());
  const dependenciesScanner = new DependenciesScanner(container, new MetadataScanner(), container.applicationConfig);
  await dependenciesScanner.scan(module);
  await new InstanceLoader(container).createInstancesOfDependencies();
  dependenciesScanner.applyApplicationProviders();
  for (const [_, module] of container.getModules()) {
    for (const [_, instanceWrapper] of module.controllers) {
      const { instance } = instanceWrapper;
      const proto = Object.getPrototypeOf(instance);
      for (const prop of Object.getOwnPropertyNames(proto)) {
        console.log('Prop:', prop);
        const targetCallback = proto[prop];
        const handlerType = Reflect.getMetadata(PATTERN_HANDLER_METADATA, targetCallback);
        console.log('Handler type:', handlerType);
        if (isUndefined(handlerType)) {
          continue;
        }
        const methodMetadata = Reflect.getMetadataKeys(proto, prop).reduce((acc, key) => {
          console.log(key);
          return Object.assign(acc, {
            [key]: Reflect.getMetadata(key, proto, prop),
          });
        }, {});
        console.log('methodMetadata', methodMetadata);
        const decoratorMetadata = Reflect.getMetadataKeys(targetCallback).reduce(
          (acc, key) =>
            Object.assign(acc, {
              [key]: Reflect.getMetadata(key, targetCallback),
            }),
          {},
        );
        yield Object.assign({}, methodMetadata, decoratorMetadata);
      }
    }
  }
}
