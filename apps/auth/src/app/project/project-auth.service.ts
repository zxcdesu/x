import { Injectable } from '@nestjs/common';
import { SignInProjectDto } from '@zxcdesu/data-access-project';
import { ProjectUserService } from '@zxcdesu/data-access-project-user';
import { JwtService } from '@zxcdesu/infrastructure';
import { ProjectJwtPayload } from './project-jwt-payload.interface';

@Injectable()
export class ProjectAuthService {
  constructor(
    private readonly projectUserService: ProjectUserService,
    private readonly jwtService: JwtService<ProjectJwtPayload>,
  ) {}

  async signIn(userId: number, payload: SignInProjectDto) {
    const { roles } = await this.projectUserService.findOne(payload.id, userId);
    return {
      token: this.jwtService.sign({
        id: userId,
        project: {
          id: payload.id,
          roles,
        },
      }),
    };
  }
}
