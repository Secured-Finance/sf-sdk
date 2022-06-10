import { Test, TestingModule } from '@nestjs/testing';
import { FilecoinLotusRepository } from '@shared/repositories';
import { ConfigModule } from '@shared/modules';
import { Response } from 'express';

import { FilecoinController } from './filecoin.controller';
import { GetMessageArgsDto } from './dtos/get-message-args.dto';
import { FilecoinService } from './filecoin.service';

describe('FilecoinController', () => {
  let controller: FilecoinController;
  let filecoinService: FilecoinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [FilecoinController],
      providers: [
        FilecoinService,
        {
          provide: FilecoinLotusRepository,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<FilecoinController>(FilecoinController);
    filecoinService = module.get<FilecoinService>(FilecoinService);

    jest
      .spyOn(filecoinService, 'fetchMessage')
      .mockImplementation(() => Promise.resolve<any>('testMsg'));
  });

  describe('root', () => {
    it('should return data', async () => {
      const response = {
        redirect: jest.fn(),
      } as unknown as Response;

      expect(controller.root(response)).toBeUndefined();
    });
  });

  describe('fetchMessage', () => {
    it('should return data', async () => {
      const message: GetMessageArgsDto = { messageId: { '/': 'testId' } };
      expect(await controller.fetchMessage(message)).toBe('testMsg');
    });
  });
});
