import { Type } from 'class-transformer';
import { IsInt, ValidateNested } from 'class-validator';
import { Prisma } from '../../prisma.service';
import { CreateAuthorDto } from './create-author.dto';
import { CreateContentDto } from './create-content.dto';

export class CreateMessageDto
  implements
    Omit<
      Prisma.MessageUncheckedCreateInput,
      'externalId' | 'status' | 'author' | 'content'
    >
{
  @Type(() => CreateAuthorDto)
  @ValidateNested()
  author: CreateAuthorDto;

  @IsInt()
  chatId: number;

  @Type(() => CreateContentDto)
  @ValidateNested()
  content: CreateContentDto;
}
