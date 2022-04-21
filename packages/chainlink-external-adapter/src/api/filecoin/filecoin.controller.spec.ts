import { Test, TestingModule } from '@nestjs/testing';
import { FilecoinController } from './filecoin.controller';

describe('FilecoinController', () => {
  let controller: FilecoinController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilecoinController],
    }).compile();

    controller = module.get<FilecoinController>(FilecoinController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
