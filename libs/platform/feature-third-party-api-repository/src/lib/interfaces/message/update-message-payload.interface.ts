import { CreateContentDto } from '@zxcdesu/data-access-message';

export interface UpdateMessagePayload {
  externalId: string;
  content: CreateContentDto;
}
