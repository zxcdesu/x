import { Message } from '../message.interface';

export interface OnMessage {
  onMessage(message: Message): Promise<void>;
}
