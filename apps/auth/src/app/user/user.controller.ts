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
    routingKey: 'createUser',
    exchange: 'auth',
  })
  @SerializeOptions({
    type: UserDto,
  })
  create(@RabbitPayload() payload: CreateUserDto): Promise<UserDto> {
    return this.userService.create(payload);
  }

  @RabbitRPC({
    routingKey: 'findOneUser',
    exchange: 'auth',
  })
  @SerializeOptions({
    type: UserDto,
  })
  findOne(@RabbitPayload() payload: FindOneUserDto): Promise<UserDto> {
    return this.userService.findOne(payload);
  }

  @RabbitRPC({
    routingKey: 'updateUser',
    exchange: 'auth',
  })
  @SerializeOptions({
    type: UserDto,
  })
  update(@RabbitPayload() payload: UpdateUserDto): Promise<UserDto> {
    return this.userService.update(payload);
  }

  @RabbitRPC({
    routingKey: 'removeUser',
    exchange: 'auth',
  })
  @SerializeOptions({
    type: UserDto,
  })
  remove(@RabbitPayload() payload: RemoveUserDto): Promise<UserDto> {
    return this.userService.remove(payload);
  }

  @RabbitRPC({
    routingKey: 'signInUser',
    exchange: 'auth',
  })
  @SerializeOptions({
    type: JwtDto,
  })
  signIn(@RabbitPayload() payload: SignInUserDto): Promise<JwtDto> {
    return this.userService.signIn(payload);
  }
}
