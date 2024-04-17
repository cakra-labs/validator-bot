import { Module } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot/telegram-bot.service';
import { ConfigModule } from '@nestjs/config';
import { RpcsModule } from 'src/rpcs/rpcs.module';

@Module({
  imports: [ConfigModule, RpcsModule],
  providers: [TelegramBotService],
  exports: [TelegramBotService],
})
export class SharedModule {}
