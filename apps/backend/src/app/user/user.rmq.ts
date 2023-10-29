import { Injectable } from '@nestjs/common';
import { RmqService } from '@platform/nestjs-rabbitmq';
import { TokenDto } from '../auth/dto/token.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserRmq extends RmqService {
  create(payload: CreateUserDto) {
    return this.request<UserDto>({
      exchange: 'auth',
      routingKey: 'createUser',
      payload,
    });
  }

  signIn(payload: SignInUserDto) {
    return this.request<TokenDto>({
      exchange: 'auth',
      routingKey: 'signInUser',
      payload,
    });
  }

  findOne(id: number) {
    return this.request<UserDto>({
      exchange: 'auth',
      routingKey: 'findOneUser',
      payload: {
        id,
      },
    });
  }

  update(payload: UpdateUserDto) {
    return this.request<UserDto>({
      exchange: 'auth',
      routingKey: 'updateUser',
      payload,
    });
  }

  remove(id: number) {
    return this.request<UserDto>({
      exchange: 'auth',
      routingKey: 'removeUser',
      payload: {
        id,
      },
    });
  }
}
