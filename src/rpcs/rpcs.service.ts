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

  public async getrpcs(): Promise<Rpc[]> {
    return this.rpcRepository.find();
  }
}
