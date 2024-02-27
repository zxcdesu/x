import { Integration, IntegrationType } from '@zxcdesu/prisma-integrations';
import { Exclude } from 'class-transformer';

export class IntegrationDto implements Integration {
  id: number;

  @Exclude()
  projectId: number;

  @Exclude()
  externalId: string;

  @Exclude()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  token: any;

  type: IntegrationType;
}
