import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@platform/nestjs-rabbitmq';
import { CreateUserDto } from './dto/create-user.dto';
import { FindOneUserDto } from './dto/find-one-user.dto';
import { RemoveUserDto } from './dto/remove-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
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
