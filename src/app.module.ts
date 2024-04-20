import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { configuration } from './config';
import { RpcsModule } from './rpcs/rpcs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { Rpc } from './entities';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      load: [configuration],
    }),

    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Rpc],
      synchronize: true,
      logging: true,
    }),

    ScheduleModule.forRoot(),

    SharedModule,

    RpcsModule,

    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
