import { BigNumber } from 'bignumber.js';

export class GetMessageResponseDto {
  from: string;
  to: string;
  value: BigNumber;
  timestamp: number;
}
