import { Module } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot/telegram-bot.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [TelegramBotService],
  exports: [TelegramBotService],
})
export class SharedModule {}
