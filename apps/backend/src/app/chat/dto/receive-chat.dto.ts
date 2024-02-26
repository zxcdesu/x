import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ChatDto } from './chat.dto';

export class HandleChatDto {
  @Type(() => ChatDto)
  @ValidateNested()
  chat: ChatDto;
}
