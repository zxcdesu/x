import { HttpService } from '@nestjs/axios';
import {
  CreateMessagePayload,
  MessagePayload,
  RemoveMessagePayload,
  UpdateMessagePayload,
} from '../interfaces';

export abstract class BaseMessageManager {
  constructor(protected readonly httpService: HttpService) {}

  abstract create(payload: CreateMessagePayload): Promise<MessagePayload>;

  abstract update(payload: UpdateMessagePayload): Promise<MessagePayload>;

  abstract remove(payload: RemoveMessagePayload): Promise<MessagePayload>;
}
