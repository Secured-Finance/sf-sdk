import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { FilecoinModule } from './filecoin/filecoin.module';

@Module({
  imports: [FilecoinModule],
  controllers: [ApiController],
})
export class ApiModule {}
