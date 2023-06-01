import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  create() {
    return this.userService.create();
  }

  findOne() {
    return this.userService.remove();
  }

  findAll() {
    return this.userService.findAll();
  }

  update() {
    return this.userService.update();
  }

  remove() {
    return this.userService.remove();
  }
}
