import { Exclude } from 'class-transformer';
import { AuthorType, Author } from '../../prisma.service';

export class AuthorDto implements Author {
  @Exclude()
  messageId: number;

  id: number;

  type: AuthorType;
}
