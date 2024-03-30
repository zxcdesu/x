import { AxiosRequestConfig } from 'axios';
import { Observable, map } from 'rxjs';
import { UrlHelper } from '../../helpers';
import { BaseClient } from '../base.client';

export class TelegramClient extends BaseClient {
  override request<T = unknown>(
    url: string,
    config: Pick<AxiosRequestConfig, 'data' | 'headers' | 'method' | 'params'>,
  ): Observable<T> {
    return this.httpClient
      .request<T>(
        Object.assign(config, {
          url: `https://api.telegram.org/bot${
            this.options.token
          }${UrlHelper.ensureLeadingSlash(url)}`,
        }),
      )
      .pipe(map((response) => response.data));
  }
}
