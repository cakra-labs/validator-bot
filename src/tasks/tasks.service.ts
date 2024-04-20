import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';
import { TelegramBotService } from '../shared/telegram-bot/telegram-bot.service';
import { RpcsService } from '../rpcs/rpcs.service';
import { StatusResponse } from '../rpcs/interfaces/status.interface';

import * as dayjs from 'dayjs';

import * as relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const DATE_FORMAT = 'MMMM D, YYYY h:mm A';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private telegramBotService: TelegramBotService,
    private rpcsService: RpcsService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async reportStatus() {
    this.logger.debug('Report status');
    const chatIds = await this.rpcsService.getChatIds();

    for (const chatId of chatIds) {
      await this.telegramBotService.getStatus(chatId);
    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  async checkSync() {
    this.logger.debug('Check sync');
    const rpcs = await this.rpcsService.getRpcs();

    for (const rpc of rpcs) {
      const resp = await fetch(rpc.url + '/status');
      const result: StatusResponse = await resp.json();

      const blockTime = dayjs(result.result.sync_info.latest_block_time);
      if (dayjs().diff(blockTime, 'minute') >= 10) {
        this.telegramBotService.sendMessage(
          rpc.telegramChatId,
          `ALERT! NOT SYNCED
${result.result.node_info.network} - ${result.result.node_info.moniker}
Latest block time ${blockTime.format(DATE_FORMAT)} - ${blockTime.fromNow()}`,
        );
      }
    }
  }
}
