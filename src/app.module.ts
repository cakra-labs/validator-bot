import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { configuration } from './config';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      load: [configuration],
    }),

    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
