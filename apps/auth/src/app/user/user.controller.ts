import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  UserDto,
  UserService,
} from '@zxcdesu/data-access-user';
import { SignInUserDto, UserAuthService } from '@zxcdesu/feature-user-auth';
import { RmqService } from '@zxcdesu/util-rmq';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userAuthService: UserAuthService,
  ) {}

  @RmqService.rpc({
    exchange: 'auth',
    routingKey: 'createUser',
    queue: 'createUser',
  })
  @SerializeOptions({
    type: UserDto,
  })
  create(@RabbitPayload() payload: CreateUserDto): Promise<UserDto> {
    return this.userService.create(payload);
  }

  @RmqService.rpc({
    exchange: 'auth',
    routingKey: 'findOneUser',
    queue: 'findOneUser',
  })
  @SerializeOptions({
    type: UserDto,
  })
  findOne(@RabbitPayload('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this.userService.findOne(id);
  }

  @RmqService.rpc({
    exchange: 'auth',
    routingKey: 'updateUser',
    queue: 'updateUser',
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

  @RmqService.rpc({
    exchange: 'auth',
    routingKey: 'removeUser',
    queue: 'removeUser',
  })
  @SerializeOptions({
    type: UserDto,
  })
  remove(@RabbitPayload('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this.userService.remove(id);
  }

  @RmqService.rpc({
    exchange: 'auth',
    routingKey: 'signInUser',
    queue: 'signInUser',
  })
  signIn(@RabbitPayload() payload: SignInUserDto): Promise<{
    token: string;
  }> {
    return this.userAuthService.signIn(payload);
  }
}
