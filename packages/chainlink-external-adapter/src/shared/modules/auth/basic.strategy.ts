import { BasicStrategy as Strategy } from 'passport-http';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigUtil } from '@shared/modules/config';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configUtil: ConfigUtil) {
    super();
  }

  async validate(username: string, password: string): Promise<boolean> {
    if (
      this.configUtil.get('auth.username') === username &&
      this.configUtil.get('auth.password') === password
    ) {
      return true;
    }
    throw new UnauthorizedException();
  }
}
