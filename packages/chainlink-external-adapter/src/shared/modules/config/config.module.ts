import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigUtil } from './config.util';
import { environmentVariables } from './environment-variables';

@Module({
  providers: [ConfigUtil],
  exports: [ConfigUtil],
})
export class ConfigModule extends NestConfigModule {
  static forRoot(): DynamicModule {
    return super.forRoot({
      load: [environmentVariables],
    });
  }
}
