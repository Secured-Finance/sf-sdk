import { Module } from '@nestjs/common';
import { ConfigModule } from '@shared/modules';
import { FilecoinLotusRepository } from '@shared/repositories';
import { FilecoinController } from './filecoin.controller';
import { FilecoinService } from './filecoin.service';

@Module({
  imports: [ConfigModule],
  controllers: [FilecoinController],
  providers: [FilecoinService, FilecoinLotusRepository],
})
export class FilecoinModule {}
