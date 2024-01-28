import { Exclude } from 'class-transformer';
import { Integration, IntegrationType } from '../../prisma.service';

export class IntegrationDto implements Integration {
  id: string;

  @Exclude()
  projectId: number;

  type: IntegrationType;

  @Exclude()
  accountId: string;

  @Exclude()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  token: any;
}
