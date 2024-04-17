import { Module } from '@nestjs/common';
import { RpcsService } from './rpcs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rpc } from '../entities';
import { RpcsController } from './rpcs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Rpc])],
  controllers: [RpcsController],
  providers: [RpcsService],
  exports: [RpcsService],
})
export class RpcsModule {}
