import { IsEnum, IsInt } from 'class-validator';
import { AuthorType, Prisma } from '../../prisma.service';

export class CreateAuthorDto
  implements Omit<Prisma.AuthorCreateInput, 'message'>
{
  @IsInt()
  id: number | null;

  @IsEnum(AuthorType)
  type: AuthorType;
}
