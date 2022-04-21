import { IsNotEmpty } from 'class-validator';
import { Cid } from 'filecoin.js/builds/dist/providers/Types';
import { IsCID } from '@shared/decorators/validators';
import { TransformCID } from '@shared/decorators/transformers';

export class GetMessageDto {
  @TransformCID()
  @IsNotEmpty()
  @IsCID()
  messageId: Cid;
}
