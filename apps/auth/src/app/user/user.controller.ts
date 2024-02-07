import { RabbitPayload } from '@golevelup/nestjs-rabbitmq';
import { Controller, SerializeOptions } from '@nestjs/common';
import { RabbitRPC } from '@zxcdesu/nestjs-rabbitmq';
import { JwtDto } from '../jwt/dto/jwt.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FindOneUserDto } from './dto/find-one-user.dto';
import { RemoveUserDto } from './dto/remove-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @RabbitRPC({
    exchange: 'auth',
    routingKey: 'createUser',
    queue: 'auth.createUser',
  })
  @SerializeOptions({
    type: UserDto,
  })
  create(@RabbitPayload() payload: CreateUserDto): Promise<UserDto> {
    return this.userService.create(payload);
  }

  @RabbitRPC({
    exchange: 'auth',
    routingKey: 'findOneUser',
    queue: 'auth.findOneUser',
  })
  @SerializeOptions({
    type: UserDto,
  })
  findOne(@RabbitPayload() payload: FindOneUserDto): Promise<UserDto> {
    return this.userService.findOne(payload);
  }

  @RabbitRPC({
    exchange: 'auth',
    routingKey: 'updateUser',
    queue: 'auth.updateUser',
  })
  @SerializeOptions({
    type: UserDto,
  })
  update(@RabbitPayload() payload: UpdateUserDto): Promise<UserDto> {
    return this.userService.update(payload);
  }

  @RabbitRPC({
    exchange: 'auth',
    routingKey: 'removeUser',
    queue: 'auth.removeUser',
  })
  @SerializeOptions({
    type: UserDto,
  })
  remove(@RabbitPayload() payload: RemoveUserDto): Promise<UserDto> {
    return this.userService.remove(payload);
  }

  @RabbitRPC({
    exchange: 'auth',
    routingKey: 'signInUser',
    queue: 'auth.signInUser',
  })
  @SerializeOptions({
    type: JwtDto,
  })
  signIn(@RabbitPayload() payload: SignInUserDto): Promise<JwtDto> {
    return this.userService.signIn(payload);
  }
}
