import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api';
import { RpcsService } from 'src/rpcs/rpcs.service';

@Injectable()
export class TelegramBotService {
  private bot: TelegramBot;
  private readonly logger = new Logger(TelegramBotService.name);

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

    this.bot.onText(/\/setrpc (.+)/, async (msg, match) => {
      try {
        await this.setRpc(msg, match);
      } catch (err) {
        this.logger.error(err);
      }
    });

    this.bot.onText(/\/listrpcs/, async (msg) => {
      try {
        await this.getListRpcs(msg);
      } catch (err) {
        this.logger.error(err);
      }
    });

    this.bot.onText(/\/removerpc (.+)/, async (msg, match) => {
      try {
        await this.removeRpc(msg, match);
      } catch (err) {
        this.logger.error(err);
      }
    });
  }

  private echo(msg: TelegramBot.Message, match: RegExpExecArray) {
    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    this.bot.sendMessage(chatId, resp);
  }

  private async setRpc(
    msg: TelegramBot.Message,
    match: RegExpExecArray,
  ): Promise<void> {
    const chatId = msg.chat.id;
    const resp = match[1];

    await this.rpcsService.addRpc({
      telegramChatId: chatId,
      url: resp,
    });

    await this.bot.sendMessage(chatId, 'Successfully added RPC');
  }

  private async getListRpcs(msg: TelegramBot.Message): Promise<void> {
    const chatId = msg.chat.id;
    const rpcs = await this.rpcsService.getRpcByTelegramChatId(chatId);

    if (!rpcs.length) {
      await this.bot.sendMessage(chatId, 'No RPC registered');
      return;
    }

    let resp = 'List registered RPCs:';
    for (const rpc of rpcs) {
      resp = resp + '\u000a' + '- ' + rpc.url;
    }

    await this.bot.sendMessage(chatId, resp);
  }

  private async removeRpc(
    msg: TelegramBot.Message,
    match: RegExpExecArray,
  ): Promise<void> {
    const chatId = msg.chat.id;
    const resp = match[1];

    const rpcs = await this.rpcsService.removeRpc(chatId, resp);
    if (rpcs.length) {
      await this.bot.sendMessage(chatId, 'Successfully removed RPC');
    }
  }
}
