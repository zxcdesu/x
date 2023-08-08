import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@platform/nestjs-rabbitmq';
import {
  CreateUserDto,
  FindOneUserDto,
  RemoveUserDto,
  UpdateUserDto,
  UserDto,
} from './user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @RabbitRPC({
    routingKey: 'createUser',
  })
  @SerializeOptions({
    type: UserDto,
  })
  create(@RabbitPayload() payload: CreateUserDto): Promise<UserDto> {
    return this.userService.create(payload);
  }

  @RabbitRPC({
    routingKey: 'findOneUser',
  })
  @SerializeOptions({
    type: UserDto,
  })
  findOne(@RabbitPayload() payload: FindOneUserDto): Promise<UserDto> {
    return this.userService.findOne(payload);
  }

  @RabbitRPC({
    routingKey: 'updateUser',
  })
  @SerializeOptions({
    type: UserDto,
  })
  update(@RabbitPayload() payload: UpdateUserDto): Promise<UserDto> {
    return this.userService.update(payload);
  }

  @RabbitRPC({
    routingKey: 'removeUser',
  })
  @SerializeOptions({
    type: UserDto,
  })
  remove(@RabbitPayload() payload: RemoveUserDto): Promise<UserDto> {
    return this.userService.remove(payload);
  }
}
