import { AuthorType, Prisma } from '@zxcdesu/prisma-platform';
import { IsEnum, IsInt, IsOptional } from 'class-validator';

export class CreateAuthorDto
  implements Omit<Prisma.AuthorUncheckedCreateInput, 'messageId'>
{
  @IsOptional()
  @IsInt()
  id?: number;

  @IsEnum(AuthorType)
  type: AuthorType;
}
