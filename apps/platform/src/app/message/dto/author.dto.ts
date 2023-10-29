import { Exclude } from 'class-transformer';
import { Author } from '../../prisma.service';
import { CreateAuthorDto } from './create-author.dto';

export class AuthorDto extends CreateAuthorDto implements Author {
  @Exclude()
  messageId: number;
}
