import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ChatObject } from './chat.object';

export class HandleChatDto {
  @Type(() => ChatObject)
  @ValidateNested()
  chat: ChatObject;
}
