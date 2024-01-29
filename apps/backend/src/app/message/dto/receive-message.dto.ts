import { Type } from 'class-transformer';
import { IsInt, ValidateNested } from 'class-validator';
import { MessageDto } from './message.dto';

export class ReceiveMessageDto {
  @IsInt()
  projectId: number;

  @IsInt()
  chatId: number;

  @Type(() => MessageDto)
  @ValidateNested()
  message: MessageDto;
}
