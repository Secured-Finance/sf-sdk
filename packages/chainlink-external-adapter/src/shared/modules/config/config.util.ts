import { Injectable } from '@nestjs/common';
import { ConfigService, Path, PathValue } from '@nestjs/config';
import { IEnvironmentVariables } from './environment-variables';

@Injectable()
export class ConfigUtil extends ConfigService<IEnvironmentVariables> {
  get<
    P extends Path<IEnvironmentVariables>,
    R = PathValue<IEnvironmentVariables, P>,
  >(propertyPath: P): R | undefined {
    return super.get(propertyPath, { infer: true });
  }
}
