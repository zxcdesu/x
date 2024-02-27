import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProjectUserService } from '@zxcdesu/data-access-project-user';
import { SignInProjectDto } from './dto/sign-in-project.dto';

@Injectable()
export class ProjectAuthService {
  constructor(
    private readonly projectUserService: ProjectUserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(userId: number, payload: SignInProjectDto) {
    const { roles } = await this.projectUserService.findOne(payload.id, userId);
    return {
      token: await this.jwtService.signAsync({
        id: userId,
        project: {
          id: payload.id,
          roles,
        },
      }),
    };
  }
}
