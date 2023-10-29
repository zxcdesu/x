import { Type } from 'class-transformer';
import { IsInt, ValidateNested } from 'class-validator';
import { Prisma } from '../../prisma.service';
import { CreateContentDto } from './create-content.dto';

export class CreateMessageDto
  implements
    Omit<
      Prisma.MessageUncheckedCreateInput,
      'externalId' | 'status' | 'content'
    >
{
  @IsInt()
  chatId: number;

  @Type(() => CreateContentDto)
  @ValidateNested()
  content: CreateContentDto;
}
