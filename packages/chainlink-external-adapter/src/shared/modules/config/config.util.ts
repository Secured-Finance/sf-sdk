import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IEnvironmentVariables } from './environment-variables';

@Injectable()
export class ConfigUtil extends ConfigService<IEnvironmentVariables> {}
