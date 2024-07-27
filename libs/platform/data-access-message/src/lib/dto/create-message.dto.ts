import { Prisma } from '@zxcdesu/prisma-platform';
import { CreateAuthorDto } from './create-author.dto';
import { CreateButtonDto } from './create-button.dto';
import { CreateMediaDto } from './create-media.dto';

export class CreateMessageDto
  implements
    Omit<
      Prisma.MessageUncheckedCreateInput,
      'externalId' | 'status' | 'buttons' | 'media' | 'author'
    >
{
  chatId: number;

  text?: string;

  buttons?: CreateButtonDto[];

  media?: CreateMediaDto[];

  author?: CreateAuthorDto;
}
