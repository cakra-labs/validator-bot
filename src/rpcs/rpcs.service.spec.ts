import { Test, TestingModule } from '@nestjs/testing';
import { RpcsService } from './rpcs.service';

describe('RpcsService', () => {
  let service: RpcsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RpcsService],
    }).compile();

    service = module.get<RpcsService>(RpcsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
