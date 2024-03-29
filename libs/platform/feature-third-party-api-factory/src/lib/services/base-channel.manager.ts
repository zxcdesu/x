import { HttpService } from '@nestjs/axios';
import {
  ChannelPayload,
  CreateChannelPayload,
  HandleChannelPayload,
  RemoveChannelPayload,
  UpdateChannelPayload,
} from '../interfaces';

export abstract class BaseChannelManager<T = unknown> {
  constructor(protected readonly httpService: HttpService) {}

  abstract create(payload: CreateChannelPayload): Promise<ChannelPayload>;

  abstract update(payload: UpdateChannelPayload): Promise<ChannelPayload>;

  abstract remove(payload: RemoveChannelPayload): Promise<ChannelPayload>;

  /**
   * Трансформация данных, полученных от стороннего api в формат платформы
   */
  abstract handle(
    payload: HandleChannelPayload<T>,
    handle: (payload: unknown) => Promise<void>,
  ): Promise<void>;
}
