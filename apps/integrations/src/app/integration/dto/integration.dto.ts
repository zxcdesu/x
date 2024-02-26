import { Exclude } from 'class-transformer';
import { Integration, IntegrationType } from '../../prisma.service';

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
