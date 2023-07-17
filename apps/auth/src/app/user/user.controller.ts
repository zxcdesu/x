import { Controller } from '@nestjs/common';
import { RabbitRPC } from '@platform/nestjs-rabbitmq';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @RabbitRPC({
    routingKey: 'createUser',
    exchange: 'auth',
  })
  create() {
    return this.userService.create();
  }

  @RabbitRPC({
    routingKey: 'findOneUser',
  })
  findOne() {
    return this.userService.remove();
  }

  @RabbitRPC({
    routingKey: 'findAllUsers',
  })
  findAll() {
    return this.userService.findAll();
  }

  @RabbitRPC({
    routingKey: 'updateUser',
  })
  update() {
    return this.userService.update();
  }

  @RabbitRPC({
    routingKey: 'removeUser',
  })
  remove() {
    return this.userService.remove();
  }
}
