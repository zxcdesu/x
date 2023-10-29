import { Event, EventType } from '../../prisma.service';

export class EventDto implements Event {
  id: number;

  projectId: number;

  userId: number;

  type: EventType;

  payload: any;

  createdAt: Date;
}
