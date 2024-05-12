import { IntegrationType, Prisma } from '@zxcdesu/prisma-integration';
import { IsDefined, IsEnum, IsString } from 'class-validator';

export class CreateIntegrationDto
  implements Omit<Prisma.IntegrationUncheckedCreateInput, 'projectId'>
{
  @IsString()
  externalId: string;

  @IsDefined()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  token: any;

  @IsEnum(IntegrationType)
  type: IntegrationType;
}
