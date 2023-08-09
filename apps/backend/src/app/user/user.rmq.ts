import { Injectable } from '@nestjs/common';
import { RmqService } from '@platform/nestjs-rabbitmq';
import { TokenDto } from '../auth/token.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserRmq extends RmqService {
  private readonly exchange = 'auth';

  create(payload: CreateUserDto) {
    return this.request<UserDto>({
      exchange: this.exchange,
      routingKey: 'createUser',
      payload,
    });
  }

  signIn(payload: SignInUserDto) {
    return this.request<TokenDto>({
      exchange: this.exchange,
      routingKey: 'signInUser',
      payload,
    });
  }

  findOne(id: number) {
    return this.request<UserDto>({
      exchange: this.exchange,
      routingKey: 'findOneUser',
      payload: {
        id,
      },
    });
  }

  update(payload: UpdateUserDto) {
    return this.request<UserDto>({
      exchange: this.exchange,
      routingKey: 'updateUser',
      payload,
    });
  }

  remove(payload: number) {
    return this.request<UserDto>({
      exchange: this.exchange,
      routingKey: 'removeUser',
      payload,
    });
  }
}
