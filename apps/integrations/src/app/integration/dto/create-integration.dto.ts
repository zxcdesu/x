import { IsDefined, IsEnum, IsInt, IsString } from 'class-validator';
import { IntegrationType, Prisma } from '../../prisma.service';

export class CreateIntegrationDto
  implements Prisma.IntegrationUncheckedCreateInput
{
  @IsInt()
  projectId: number;

  @IsEnum(IntegrationType)
  type: IntegrationType;

  @IsString()
  accountId: string;

  @IsDefined()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  token: any;
}
