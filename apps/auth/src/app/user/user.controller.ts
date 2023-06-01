import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  create() {
    return this.userService.create();
  }

  findOne() {
    return this.userService.create();
  }

  findAll() {
    return this.userService.create();
  }

  update() {
    return this.userService.create();
  }

  remove() {
    return this.userService.create();
  }
}
