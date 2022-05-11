import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ConfigUtil, BasicAuthGuard } from '@shared/modules';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  app.useGlobalGuards(new BasicAuthGuard());
  const configUtil = app.get(ConfigUtil);

  await app.listen(configUtil.get('port'));
}
bootstrap();
