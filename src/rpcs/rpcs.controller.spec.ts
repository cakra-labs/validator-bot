import { Test, TestingModule } from '@nestjs/testing';
import { RpcsController } from './rpcs.controller';

describe('RpcsController', () => {
  let controller: RpcsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RpcsController],
    }).compile();

    controller = module.get<RpcsController>(RpcsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
