import { Event, EventType } from '../../prisma.service';

export class EventDto implements Event {
  id: number;

  projectId: number;

  userId: number;

  type: EventType;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;

  createdAt: Date;
}
