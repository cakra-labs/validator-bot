import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rpc } from '../entities';
import { Repository } from 'typeorm';

@Injectable()
export class RpcsService {
  constructor(
    @InjectRepository(Rpc)
    private readonly rpcRepository: Repository<Rpc>,
  ) {}

  public async getRpcs(): Promise<Rpc[]> {
    return this.rpcRepository.find();
  }

  public async addRpc(rpc: Partial<Rpc>): Promise<Rpc> {
    const newRpc = this.rpcRepository.create(rpc);
    await this.rpcRepository.save(newRpc);
    return newRpc;
  }
}
