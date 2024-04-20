import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { SharedModule } from '../shared/shared.module';
import { RpcsModule } from '../rpcs/rpcs.module';

@Module({
  imports: [SharedModule, RpcsModule],
  providers: [TasksService],
})
export class TasksModule {}
