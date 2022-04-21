import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ChainlinkInterceptor } from '@shared/interceptors';
import { ConfigUtil } from '@shared/modules/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ChainlinkInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  const configUtil = app.get(ConfigUtil);

  await app.listen(configUtil.get('port'));
}
bootstrap();
