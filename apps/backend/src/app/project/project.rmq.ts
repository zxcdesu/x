import { Injectable } from '@nestjs/common';
import { RmqService } from '@platform/nestjs-rabbitmq';

@Injectable()
export class ProjectRmq extends RmqService {
  private readonly exchange = 'auth';

  create(payload: any) {
    return this.request<any>({
      exchange: this.exchange,
      routingKey: 'createProject',
      payload,
    });
  }

  findOne(payload: number) {
    return this.request<any>({
      exchange: this.exchange,
      routingKey: 'findOneProject',
      payload,
    });
  }

  findAll(payload?: number[]) {
    return this.request<any[]>({
      exchange: this.exchange,
      routingKey: 'findAllProjects',
      payload,
    });
  }

  update(payload: any) {
    return this.request<any>({
      exchange: this.exchange,
      routingKey: 'updateProject',
      payload,
    });
  }

  remove(payload: number) {
    return this.request<any>({
      exchange: this.exchange,
      routingKey: 'removeProject',
      payload,
    });
  }
}
