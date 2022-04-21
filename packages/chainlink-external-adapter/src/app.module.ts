import { Module } from '@nestjs/common';
import { ConfigModule } from '@shared/modules';
import { ApiModule } from './api/api.module';

@Module({
  imports: [ApiModule, ConfigModule.forRoot()],
})
export class AppModule {}
