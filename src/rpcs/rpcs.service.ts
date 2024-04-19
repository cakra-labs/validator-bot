import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rpc } from '../entities';
import { Repository } from 'typeorm';
import { StatusResponse } from './interfaces/status.interface';

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

  public async getRpcByTelegramChatId(telegramChatId: number): Promise<Rpc[]> {
    return this.rpcRepository.find({
      where: {
        telegramChatId,
      },
    });
  }

  public async removeRpc(telegramChatId: number, url: string): Promise<Rpc[]> {
    const rpcs = await this.rpcRepository.find({
      where: {
        telegramChatId,
        url,
      },
    });
    return this.rpcRepository.remove(rpcs);
  }

  public async getStatuses(telegramChatId: number): Promise<StatusResponse[]> {
    const rpcs = await this.getRpcByTelegramChatId(telegramChatId);
    const requests = rpcs.map(async (rpc) => {
      const resp = await fetch(rpc.url + '/status');
      const result: StatusResponse = await resp.json();
      return result;
    });

    return Promise.all(requests);
  }
}
