import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { GetMessageDto } from './dtos/get-message.dto';
import { FilecoinService } from './filecoin.service';

@Controller('filecoin')
export class FilecoinController {
  constructor(private readonly filecoinService: FilecoinService) {}

  @Post()
  root(@Res() res: Response): void {
    res.redirect(307, '/filecoin/message');
  }

  @Post('message')
  fetchMessage(@Body() { messageId }: GetMessageDto): Promise<string> {
    return this.filecoinService.fetchMessage(messageId);
  }
}
