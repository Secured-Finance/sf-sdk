import {
  Injectable,
  Scope,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Retryable } from 'typescript-retry-decorator';
import {
  BlockHeader,
  Cid,
  Message,
} from 'filecoin.js/builds/dist/providers/Types';
import { FilecoinLotusRepository } from '@shared/repositories';

@Injectable({ scope: Scope.REQUEST })
export class FilecoinService {
  constructor(
    private readonly filecoinLotusRepository: FilecoinLotusRepository,
  ) {}

  async getMessage(messageId: Cid): Promise<string> {
    try {
      const { message, block } = await this.getMessageWithBlockHeader(
        messageId,
      );

      return JSON.stringify({
        to: message.To,
        from: message.From,
        value: message.Value,
        timestamp: block.Timestamp,
      });
    } finally {
      this.filecoinLotusRepository.release();
    }
  }

  @Retryable({
    maxAttempts: 2,
    backOff: 1000,
    doRetry: (e: Error) => !(e instanceof NotFoundException),
  })
  private async getMessageWithBlockHeader(messageId: Cid): Promise<{
    message: Message;
    block: BlockHeader;
  }> {
    try {
      const [message, msgLookup] = await Promise.all([
        this.filecoinLotusRepository.chain.getMessage(messageId),
        this.filecoinLotusRepository.state.searchMsg(messageId),
      ]);

      if (!msgLookup) {
        throw new BadRequestException('message has not been mined');
      }

      const tipset = await this.filecoinLotusRepository.custom.getTipSet(
        msgLookup.TipSet,
      );

      return { message, block: tipset.Blocks[0] };
    } catch (error) {
      if (error.message === 'blockstore: block not found') {
        throw new NotFoundException('block not found');
      }
      throw error;
    }
  }
}
