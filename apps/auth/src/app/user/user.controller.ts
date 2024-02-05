import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import {
  CreateUserDto,
  SignInUserDto,
  UpdateUserDto,
  UserDto,
  UserService,
} from '@zxcdesu/data-access-user';
import { JwtDto } from '@zxcdesu/infrastructure';
import { RabbitRPC } from '@zxcdesu/nestjs-rabbitmq';
import { UserAuthService } from './user-auth.service';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userAuthService: UserAuthService,
  ) {}

  @RabbitRPC({
    exchange: 'auth',
    routingKey: 'createUser',
    queue: 'auth.createUser',
  })
  @SerializeOptions({
    type: UserDto,
  })
  create(@RabbitPayload() payload: CreateUserDto): Promise<UserDto> {
    return this.userService.create(payload);
  }

  @RabbitRPC({
    exchange: 'auth',
    routingKey: 'findOneUser',
    queue: 'auth.findOneUser',
  })
  @SerializeOptions({
    type: UserDto,
  })
  findOne(@RabbitPayload('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this.userService.findOne(id);
  }

  @RabbitRPC({
    exchange: 'auth',
    routingKey: 'updateUser',
    queue: 'auth.updateUser',
  })
  @SerializeOptions({
    type: UserDto,
  })
  update(
    @RabbitPayload('id', ParseIntPipe) id: number,
    @RabbitPayload() payload: UpdateUserDto,
  ): Promise<UserDto> {
    return this.userService.update(id, payload);
  }

  @RabbitRPC({
    exchange: 'auth',
    routingKey: 'removeUser',
    queue: 'auth.removeUser',
  })
  @SerializeOptions({
    type: UserDto,
  })
  remove(@RabbitPayload('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this.userService.remove(id);
  }

  @RabbitRPC({
    exchange: 'auth',
    routingKey: 'signInUser',
    queue: 'auth.signInUser',
  })
  @SerializeOptions({
    type: JwtDto,
  })
  signIn(@RabbitPayload() payload: SignInUserDto): Promise<JwtDto> {
    return this.userAuthService.signIn(payload);
  }
}
