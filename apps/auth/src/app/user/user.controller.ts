import { Controller, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@platform/nestjs-rabbitmq';
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
  create() {
    return this.userService.create();
  }

  @RabbitRPC({
    routingKey: 'findOneUser',
  })
  @SerializeOptions({
    // type: User
  })
  findOne() {
    return this.userService.remove();
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
  update() {
    return this.userService.update();
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
