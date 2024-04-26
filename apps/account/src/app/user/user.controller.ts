import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  UserDto,
  UserRmq,
  UserService,
} from '@zxcdesu/data-access-user';
import { ProjectUserInviteService } from '@zxcdesu/feature-project-user-invite';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly projectUserInviteService: ProjectUserInviteService,
  ) {}

  @UserRmq.create()
  @SerializeOptions({
    type: UserDto,
  })
  create(@RabbitPayload() payload: CreateUserDto): Promise<UserDto> {
    return this.projectUserInviteService.createUser(payload);
  }

  @UserRmq.findOne()
  @SerializeOptions({
    type: UserDto,
  })
  findOne(@RabbitPayload('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this.userService.findOne(id);
  }

  @UserRmq.update()
  @SerializeOptions({
    type: UserDto,
  })
  update(
    @RabbitPayload('id', ParseIntPipe) id: number,
    @RabbitPayload() payload: UpdateUserDto,
  ): Promise<UserDto> {
    return this.userService.update(id, payload);
  }

  @UserRmq.remove()
  @SerializeOptions({
    type: UserDto,
  })
  remove(@RabbitPayload('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this.userService.remove(id);
  }
}
