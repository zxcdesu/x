import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { AuthorType, Prisma } from '../../prisma.service';

export class CreateAuthorDto
  implements Omit<Prisma.AuthorUncheckedCreateInput, 'messageId'>
{
  @IsOptional()
  @IsInt()
  id?: number;

  @IsEnum(AuthorType)
  type: AuthorType;
}
