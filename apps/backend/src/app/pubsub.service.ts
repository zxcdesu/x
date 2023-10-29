import { PubSub } from 'graphql-subscriptions';

export class PubSubService extends PubSub {
  public static messageReceived(projectId: number, chatId: number) {
    return `messageReceived:${projectId}:${chatId}`;
  }

  public static chatReceived(projectId: number) {
    return `chatReceived:${projectId}`;
  }
}
