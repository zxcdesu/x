import { NotImplementedException } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { Observable } from 'rxjs';
import { BaseClient } from '../base.client';

export class InstagramClient extends BaseClient {
  override request<T = unknown>(
    url: string,
    config: Pick<AxiosRequestConfig, 'data' | 'headers' | 'method' | 'params'>,
  ): Observable<T> {
    throw new NotImplementedException({
      url,
      config,
    });
  }
}
