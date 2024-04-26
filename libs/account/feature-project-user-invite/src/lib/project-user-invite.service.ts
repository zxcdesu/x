import { Injectable } from '@nestjs/common';
import { CreateInviteDto, InviteService } from '@zxcdesu/data-access-invite';
import { ProjectUserService } from '@zxcdesu/data-access-project-user';
import { CreateUserDto, UserService } from '@zxcdesu/data-access-user';

@Injectable()
export class ProjectUserInviteService {
  constructor(
    private readonly inviteService: InviteService,
    private readonly userService: UserService,
    private readonly projectUserService: ProjectUserService,
  ) {}

  async createInvite(projectId: number, payload: CreateInviteDto) {
    const user = await this.userService.findOneOrDefaultByEmail(payload.email);
    if (user) {
      await this.projectUserService.create(projectId, user.id, payload);
    } else {
      await this.inviteService.create(projectId, payload);
    }

    return Object.assign({}, payload, {
      projectId,
    });
  }

  async createUser(payload: CreateUserDto) {
    return this.userService.create(
      payload,
      await this.inviteService.findAllByEmail(payload.email),
    );
  }
}
