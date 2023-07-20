import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@platform/nestjs-rabbitmq';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @RabbitRPC({
    routingKey: 'createUser',
  })
  @SerializeOptions({
    // type: User
  })
  create(@RabbitPayload() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @RabbitRPC({
    routingKey: 'findOneUser',
  })
  @SerializeOptions({
    // type: User
  })
  findOne() {
    return this.userService.findOne();
  }

  @RabbitRPC({
    routingKey: 'findAllUsers',
  })
  @SerializeOptions({
    // type: User
  })
  findAll() {
    return this.userService.findAll();
  }

  @RabbitRPC({
    routingKey: 'updateUser',
  })
  @SerializeOptions({
    // type: User
  })
  update(@RabbitPayload() payload: UpdateUserDto) {
    return this.userService.update(payload);
  }

  @RabbitRPC({
    routingKey: 'removeUser',
  })
  @SerializeOptions({
    // type: User
  })
  remove() {
    return this.userService.remove();
  }
}
