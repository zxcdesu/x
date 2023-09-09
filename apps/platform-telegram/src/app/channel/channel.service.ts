import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChannelPayload, CreateChannel } from '@platform/platform-type';
import { Observable, catchError, map } from 'rxjs';

@Injectable()
export class ChannelService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  create({
    id,
    accountId,
    token,
  }: CreateChannel<string>): Observable<ChannelPayload> {
    return this.httpService
      .post(`bot${token}/setWebhook`, {
        url: this.configService
          .get<string>('GATEWAY_URL')
          .concat(`/telegram/${id}`),
      })
      .pipe(
        map((): ChannelPayload => {
          return {
            accountId,
            token,
            status: 'Connected',
          };
        }),
        catchError(async (error): Promise<ChannelPayload> => {
          return {
            accountId,
            token,
            status: 'Failed',
            failedReason: error?.response?.data?.description,
          };
        }),
      );
  }
}
