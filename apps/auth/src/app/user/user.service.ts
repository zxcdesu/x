import {
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { InviteService } from '../invite/invite.service';
import { JwtService } from '../jwt/jwt.service';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindOneUserDto } from './dto/find-one-user.dto';
import { RemoveUserDto } from './dto/remove-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserJwtPayload } from './user-jwt-payload.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService<UserJwtPayload>,
    @Inject(forwardRef(() => InviteService))
    private readonly inviteService: InviteService,
  ) {}

  async create(payload: CreateUserDto) {
    const invites = await this.inviteService.findAll(payload.email);
    return this.prismaService.user.create({
      data: {
        ...payload,
        password: await hash(payload.password, 10),
        projects: {
          createMany: {
            data: invites.map(({ projectId }) => ({
              projectId,
            })),
          },
        },
      },
    });
  }

  async signIn(payload: SignInUserDto) {
    const user = await this.prismaService.user.findUniqueOrThrow({
      where: {
        email: payload.email,
      },
    });

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

  findOne(payload: FindOneUserDto) {
    return this.prismaService.user.findUniqueOrThrow({
      where: payload,
    });
  }

  findOneByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  update(payload: UpdateUserDto) {
    return this.prismaService.user.update({
      where: {
        id: payload.id,
      },
      data: payload,
    });
  }

  remove(payload: RemoveUserDto) {
    return this.prismaService.user.delete({
      where: payload,
    });
  }
}
