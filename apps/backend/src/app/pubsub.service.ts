import { PubSub } from 'graphql-subscriptions';
import { AssignedToDto } from './contact/dto/assigned-to.dto';

export class PubSubService extends PubSub {
  public static messageReceived(projectId: number, chatId: number) {
    return `messageReceived:${projectId}:${chatId}`;
  }

  public static chatReceived(
    projectId: number,
    assignedTo: AssignedToDto | false = false,
  ) {
    return `chatReceived:${projectId}:${Object.values(assignedTo).join(':')}`;
  }
}
