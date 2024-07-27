import type { Author, AuthorType } from '@zxcdesu/prisma-platform';
import { Exclude } from 'class-transformer';

export class AuthorDto implements Author {
  @Exclude()
  messageId: number;

  id: number | null;

  type: AuthorType;
}
