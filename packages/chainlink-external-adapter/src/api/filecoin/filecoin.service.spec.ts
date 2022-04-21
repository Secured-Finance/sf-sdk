import { Test, TestingModule } from '@nestjs/testing';
import { FilecoinService } from './filecoin.service';

describe('FilecoinService', () => {
  let service: FilecoinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilecoinService],
    }).compile();

    service = module.get<FilecoinService>(FilecoinService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
