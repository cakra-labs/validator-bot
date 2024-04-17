import { Controller, Get } from '@nestjs/common';
import { RpcsService } from './rpcs.service';
import { Rpc } from '../entities';

@Controller('rpcs')
export class RpcsController {
  constructor(private readonly rpcsService: RpcsService) {}

  @Get()
  public async getRpcs(): Promise<Rpc[]> {
    const result = await this.rpcsService.getRpcs();

    return result;
  }
}
