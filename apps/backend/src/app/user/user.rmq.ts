import { Injectable } from '@nestjs/common';
import { RmqService } from '@platform/nestjs-rabbitmq';
import { CreateUserDto, UpdateUserDto, User } from './user.dto';

@Injectable()
export class UserRmq extends RmqService {
  private readonly exchange = 'auth';

  create(payload: CreateUserDto) {
    return this.request<User>({
      exchange: this.exchange,
      routingKey: 'createUser',
      payload,
    });
  }

  findOne(payload: number) {
    return this.request<User>({
      exchange: this.exchange,
      routingKey: 'findOneUser',
      payload,
    });
  }

  findAll(payload?: number[]) {
    return this.request<User[]>({
      exchange: this.exchange,
      routingKey: 'findAllUsers',
      payload,
    });
  }

  update(payload: UpdateUserDto) {
    return this.request<User>({
      exchange: this.exchange,
      routingKey: 'updateUser',
      payload,
    });
  }

  remove(payload: number) {
    return this.request<User>({
      exchange: this.exchange,
      routingKey: 'removeUser',
      payload,
    });
  }
}
