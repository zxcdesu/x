import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { Observable } from 'rxjs';
import { ClientOptions } from '../interfaces';

export abstract class BaseClient {
  constructor(
    protected readonly options: ClientOptions,
    protected readonly httpClient: HttpService,
  ) {}

  abstract request<T = unknown>(
    url: string,
    config: Pick<AxiosRequestConfig, 'data' | 'headers' | 'method' | 'params'>,
  ): Observable<T>;
}
