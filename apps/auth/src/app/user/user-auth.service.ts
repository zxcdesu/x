import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInUserDto, UserService } from '@zxcdesu/data-access-user';
import { JwtService } from '@zxcdesu/infrastructure';
import { compare } from 'bcrypt';
import { UserJwtPayload } from './user-jwt-payload.interface';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService<UserJwtPayload>,
  ) {}

  async signIn(payload: SignInUserDto) {
    const user = await this.userService.findOneByEmail(payload.email);

    if (await compare(payload.password, user.password)) {
      return {
        token: this.jwtService.sign({
          id: user.id,
        }),
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
