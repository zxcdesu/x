import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, ParseIntPipe, SerializeOptions } from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  UserDto,
  UserRmq,
  UserService,
} from '@zxcdesu/data-access-user';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UserRmq.create()
  @SerializeOptions({
    type: UserDto,
  })
  create(@RabbitPayload() payload: CreateUserDto): Promise<UserDto> {
    return this.userService.create(payload);
  }

  @UserRmq.findOne()
  @SerializeOptions({
    type: UserDto,
  })
  findOne(@RabbitPayload('id', ParseIntPipe) id: number): Promise<UserDto> {
    return this.userService.findOne(id);
  }

  @UserRmq.findAll()
  @SerializeOptions({
    type: UserDto,
  })
  findAll(): Promise<UserDto[]> {
    return this.userService.findAll();
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
