import { History, HistoryType } from '../../prisma.service';

export class HistoryDto implements History {
  id: number;

  projectId: number;

  userId: number;

  type: HistoryType;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;

  createdAt: Date;
}
