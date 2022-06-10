import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import {
  Cid,
  Message,
  MsgLookup,
  TipSet,
} from 'filecoin.js/builds/dist/providers/Types';
import { BigNumber } from 'bignumber.js';
import { MaxAttemptsError } from 'typescript-retry-decorator';

import { ConfigModule } from '@shared/modules';
import { FilecoinLotusRepository } from '@shared/repositories';
import { FilecoinService } from './filecoin.service';

type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

describe('FilecoinService', () => {
  let service: FilecoinService;
  let filecoinLotusRepository: FilecoinLotusRepository;

  beforeEach(async () => {
    const message: Partial<Message> = {
      To: 'toAddress',
      From: 'fromAddress',
      Value: new BigNumber('1'),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        FilecoinService,
        {
          provide: FilecoinLotusRepository,
          useClass: class {
            chain = { getMessage: () => Promise.resolve(message) };
            state = { searchMsg: () => Promise.resolve() };
            custom = { getTipSet: () => Promise.resolve() };
            release = jest.fn();
          },
        },
      ],
    }).compile();

    service = module.get<FilecoinService>(FilecoinService);
    filecoinLotusRepository = module.get<FilecoinLotusRepository>(
      FilecoinLotusRepository,
    );
  });

  describe('fetchMessage', () => {
    it('should return data', async () => {
      const messageId: Cid = { '/': 'testId' };
      const msgLookup: Partial<MsgLookup> = {
        TipSet: null,
      };
      const tipset: DeepPartial<TipSet> = {
        Blocks: [{ Timestamp: 123 }],
      };

      jest
        .spyOn(filecoinLotusRepository.state, 'searchMsg')
        .mockImplementation(() => Promise.resolve(msgLookup) as any);
      jest
        .spyOn(filecoinLotusRepository.custom, 'getTipSet')
        .mockImplementation(() => Promise.resolve(tipset) as any);

      expect(await service.fetchMessage(messageId)).toEqual({
        to: 'toAddress',
        from: 'fromAddress',
        value: new BigNumber('1'),
        timestamp: 123,
      });
    });

    it('should throw BadRequestException', async () => {
      const messageId: Cid = { '/': 'testId' };
      await expect(service.fetchMessage(messageId)).rejects.toThrowError(
        new BadRequestException('message has not been mined'),
      );
    });

    it('should throw MaxAttemptsError', async () => {
      const messageId: Cid = { '/': 'testId' };

      jest
        .spyOn(filecoinLotusRepository.state, 'searchMsg')
        .mockImplementation(() => {
          throw new Error('blockstore: block not found');
        });

      await expect(service.fetchMessage(messageId)).rejects.toThrowError(
        new NotFoundException('block not found'),
      );
    });

    it('should throw NotFoundException', async () => {
      const messageId: Cid = { '/': 'testId' };
      const errMsg = 'unexpected error';

      jest
        .spyOn(filecoinLotusRepository.state, 'searchMsg')
        .mockImplementation(() => {
          throw new Error(errMsg);
        });

      await expect(service.fetchMessage(messageId)).rejects.toThrowError(
        new MaxAttemptsError(
          `Failed for 'fetchMessageWithBlockHeader' for 2 times. Original Error: ${errMsg}`,
        ),
      );
    });
  });
});
