import { Type } from 'class-transformer';
import { IsInt, ValidateNested } from 'class-validator';
import { ChatDto } from './chat.dto';

export class ReceiveChatDto {
  @IsInt()
  projectId: number;

  @Type(() => ChatDto)
  @ValidateNested()
  chat: ChatDto;
}
