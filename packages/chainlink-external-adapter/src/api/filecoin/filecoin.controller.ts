import { Body, Controller, Post, Res, UseInterceptors } from '@nestjs/common';
import { ChainlinkInterceptor } from '@shared/interceptors';
import { Response } from 'express';
import { GetMessageArgsDto, GetMessageResponseDto } from './dtos';
import { FilecoinService } from './filecoin.service';

@Controller('filecoin')
@UseInterceptors(ChainlinkInterceptor)
export class FilecoinController {
  constructor(private readonly filecoinService: FilecoinService) {}

  @Post()
  root(@Res() res: Response): void {
    res.redirect(307, '/filecoin/message');
  }

  @Post('message')
  fetchMessage(
    @Body() { messageId }: GetMessageArgsDto,
  ): Promise<GetMessageResponseDto> {
    return this.filecoinService.fetchMessage(messageId);
  }
}
