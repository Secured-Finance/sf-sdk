import { Controller, Get } from '@nestjs/common';

@Controller()
export class ApiController {
  @Get()
  root(): string {
    return 'ok';
  }
}
