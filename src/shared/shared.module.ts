import { Module } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot/telegram-bot.service';

@Module({
  providers: [TelegramBotService],
  exports: [TelegramBotService],
})
export class SharedModule {}
