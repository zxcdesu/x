import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateAuthorDto } from './create-author.dto';
import { CreateContentDto } from './create-content.dto';

export class CreateMessageDto {
  @Type(() => CreateAuthorDto)
  @ValidateNested()
  author: CreateAuthorDto;

  @Type(() => CreateContentDto)
  @ValidateNested()
  content: CreateContentDto;
}
