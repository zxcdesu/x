import { Exclude } from 'class-transformer';
import { Author, AuthorType } from '../../prisma.service';

export class AuthorDto implements Author {
  @Exclude()
  messageId: number;

  id: number | null;

  type: AuthorType;
}
