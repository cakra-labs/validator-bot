import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { configuration } from './config';
import { RpcsModule } from './rpcs/rpcs.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Rpc } from './entities';

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

    SharedModule,

    RpcsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
