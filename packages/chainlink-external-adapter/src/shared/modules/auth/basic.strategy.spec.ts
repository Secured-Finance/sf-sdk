import { Test, TestingModule } from '@nestjs/testing';
import { BasicStrategy } from './basic.strategy';
import { ConfigModule, ConfigUtil } from '@shared/modules';
import { UnauthorizedException } from '@nestjs/common';

describe('BasicStrategy', () => {
  let basicStrategy: BasicStrategy;
  const config = {
    'auth.username': 'test',
    'auth.password': 'valid',
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        BasicStrategy,
        {
          provide: ConfigUtil,
          useValue: { get: (value: string) => config[value] },
        },
      ],
    }).compile();

    basicStrategy = app.get<BasicStrategy>(BasicStrategy);
  });

  describe('validate', () => {
    it('should return true', () => {
      expect(basicStrategy.validate('test', 'valid')).toBeTruthy();
    });

    it('should throw UnauthorizedException', () => {
      expect(basicStrategy.validate('test', 'invalid')).rejects.toThrowError(
        new UnauthorizedException(),
      );
    });
  });
});
