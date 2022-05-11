import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@shared/modules';
import { BasicStrategy } from './basic.strategy';

@Module({
  imports: [PassportModule, forwardRef(() => ConfigModule)],
  providers: [BasicStrategy],
})
export class AuthModule {}
