import { NotImplementedException } from '@nestjs/common';
import { ChannelStatus } from '@zxcdesu/prisma-platform';
import { catchError, lastValueFrom, map, of } from 'rxjs';
import { UrlHelper } from '../../helpers';
import {
  ChannelPayload,
  HandleChannelPayload,
  UpsertChannelPayload,
} from '../../interfaces';
import { BaseChannelManager } from '../base-channel.manager';

export class TelegramChannelManager extends BaseChannelManager {
  override async upsert(
    payload: UpsertChannelPayload,
  ): Promise<ChannelPayload> {
    return lastValueFrom(
      this.client
        .request('setWebhook', {
          method: 'POST',
          data: {
            url: UrlHelper.ensureTrailingSlash(
              this.configService.getOrThrow<string>('GATEWAY_URL'),
            ).concat(payload.id.toString()),
          },
        })
        .pipe(
          map(() => ({
            status: ChannelStatus.Active,
            failedReason: null,
          })),
          catchError((error) =>
            of({
              status: ChannelStatus.Failed,
              failedReason: error?.response?.data?.message,
            }),
          ),
        ),
    );
  }

  override remove(): Promise<void> {
    return lastValueFrom(
      this.client.request('removeWebhook', {
        method: 'POST',
      }),
    );
  }

  override handle(
    payload: HandleChannelPayload,
    handle: (payload: unknown) => Promise<void>,
  ): Promise<void> {
    handle(payload);
    throw new NotImplementedException({
      payload,
    });
  }
}
