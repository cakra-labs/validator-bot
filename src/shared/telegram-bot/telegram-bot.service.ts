import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api';
import { RpcsService } from 'src/rpcs/rpcs.service';

@Injectable()
export class TelegramBotService {
  private bot: TelegramBot;

  constructor(
    private configService: ConfigService,
    private rpcsService: RpcsService,
  ) {
    const token = this.configService.get<string>('telegramBotToken');
    this.bot = new TelegramBot(token, { polling: true });

    this.bot.onText(/\/echo (.+)/, (msg, match) => {
      // 'msg' is the received Message from Telegram
      // 'match' is the result of executing the regexp above on the text content
      // of the message

      this.echo(msg, match);
    });

    this.bot.onText(/\/setrpc (.+)/, (msg, match) => {
      this.setRpc(msg, match);
    });
  }

  private echo(msg: TelegramBot.Message, match: RegExpExecArray) {
    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    this.bot.sendMessage(chatId, resp);
  }

  private setRpc(msg: TelegramBot.Message, match: RegExpExecArray) {
    const chatId = msg.chat.id;
    const resp = match[1];

    this.rpcsService.addRpc({
      telegramChatId: chatId,
      url: resp,
    });
  }
}
