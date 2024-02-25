import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { UserService } from './user.service';

@Injectable()
export class UserAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(payload: SignInUserDto) {
    const user = await this.userService.findOneOrNullByEmail(payload.email);
    if (user && (await verify(payload.password, user.password))) {
      return {
        token: await this.jwtService.signAsync({
          id: user.id,
        }),
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
