import { Observable, lastValueFrom, map } from 'rxjs';
import { Content } from '../../interfaces';
import { ThirdPartyApi } from './interfaces';

export class TelegramApi extends ThirdPartyApi {
  override async init(subscribe = true): Promise<void> {
    await lastValueFrom(this.request('getMe'));
    if (subscribe) {
      await lastValueFrom(
        this.request('setWebhook', {
          url: this.gatewayUrlProvider.get(this.options.credentials.id),
        }),
      );
    }
  }

  override destroy(): Promise<void> {
    return Promise.resolve();
  }

  override sendMessage(externalId: string, content: Content): Promise<string> {
    throw new Error('Method not implemented.');
  }

  override optIn(): Promise<void> {
    return Promise.resolve();
  }

  override optOut(): Promise<void> {
    return Promise.resolve();
  }

  override handleEvent(event: unknown): Promise<void> {
    throw new Error('Method not implemented.');
  }

  private request<R, T = unknown>(method: string, data?: T): Observable<R> {
    return this.httpService
      .post<R>(
        `https://api.telegram.org/bot${this.options.credentials.token}/${method}`,
        data,
      )
      .pipe(map(({ data }) => data));
  }
}
