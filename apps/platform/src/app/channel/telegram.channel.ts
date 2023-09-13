import { ChannelEvent } from '@platform/platform-type';
import { catchError, lastValueFrom, map } from 'rxjs';
import { Channel, ChannelStatus, Prisma } from '../prisma.service';
import { AbstractChannel } from './abstract.channel';

export class TelegramChannel extends AbstractChannel {
  async create(channel: Channel): Promise<Prisma.ChannelUncheckedUpdateInput> {
    return lastValueFrom(
      this.httpService
        .post(`https://api.telegram.org/bot${channel.token}/setWebhook`, {
          url: this.configService
            .get<string>('GATEWAY_URL')
            .concat(`/${channel.id.toString()}`),
        })
        .pipe(
          map(() => {
            return {
              status: ChannelStatus.Connected,
            };
          }),
          catchError(async (error) => {
            console.error(channel, error);
            return {
              status: ChannelStatus.Failed,
              failedReason: error?.response?.data?.description,
            };
          }),
        ),
    );
  }

  async event(
    channel: Channel,
    payload: ChannelEvent<unknown, unknown>,
  ): Promise<void> {
    console.log(channel, payload);
  }
}
