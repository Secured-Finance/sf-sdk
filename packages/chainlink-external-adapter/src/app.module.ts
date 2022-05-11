import { Module } from '@nestjs/common';
import { AuthModule, ConfigModule } from '@shared/modules';
import { ApiModule } from './api/api.module';

@Module({
  imports: [ApiModule, AuthModule, ConfigModule.forRoot()],
})
export class AppModule {}
