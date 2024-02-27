import { Injectable } from '@nestjs/common';
import { RmqService } from '@zxcdesu/util-rmq';
import { TokenDto } from '../auth/dto/token.dto';
import { CreateUserArgs } from './dto/create-user.args';
import { SignInUserArgs } from './dto/sign-in-user.args';
import { UpdateUserArgs } from './dto/update-user.args';
import { User } from './dto/user.entity';

@Injectable()
export class UserRmq extends RmqService {
  create(payload: CreateUserArgs) {
    return this.request<User>({
      exchange: 'auth',
      routingKey: 'createUser',
      payload,
    });
  }

  findOne(id: number) {
    return this.request<User>({
      exchange: 'auth',
      routingKey: 'findOneUser',
      payload: {
        id,
      },
    });
  }

  update(id: number, payload: UpdateUserArgs) {
    return this.request<User>({
      exchange: 'auth',
      routingKey: 'updateUser',
      payload: {
        ...payload,
        id,
      },
    });
  }

  remove(id: number) {
    return this.request<User>({
      exchange: 'auth',
      routingKey: 'removeUser',
      payload: {
        id,
      },
    });
  }

  signIn(payload: SignInUserArgs) {
    return this.request<TokenDto>({
      exchange: 'auth',
      routingKey: 'signInUser',
      payload,
    });
  }
}
