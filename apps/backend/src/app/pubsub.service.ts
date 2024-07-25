import { EventEmitter, Readable } from 'node:stream';

export class PubSubService {
  static provide = this;

  static useFactory = () => this.staticInstance;

  private static staticInstance = new this();

  private constructor(private readonly eventEmitter = new EventEmitter()) {}

  async subscribe<TResult = unknown>(
    topics: string | string[],
    queue: Readable & { close?: Array<() => void> },
  ): Promise<void> {
    if (!Array.isArray(topics)) {
      topics = [topics];
    }

    topics.forEach((topic) => {
      const listener = (value: TResult) => void queue.push(value);
      const close = () =>
        void this.eventEmitter.removeListener(topic, listener);

      this.eventEmitter.on(topic, listener);

      if (!Array.isArray(queue.close)) {
        queue.close = [];
      }

      queue.close.push(close);
    });
  }

  publish<TResult = unknown>(
    event: { topic: string; payload: TResult },
    callback?: () => void,
  ): void {
    if (this.eventEmitter.emit(event.topic, event.payload)) {
      callback?.();
    }
  }
}
