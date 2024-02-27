import { Injectable } from '@nestjs/common';
import { CreateInviteDto, InviteService } from '@zxcdesu/data-access-invite';
import { ProjectUserService } from '@zxcdesu/data-access-project-user';
import { UserService } from '@zxcdesu/data-access-user';

@Injectable()
export class InviteUserToProjectService {
  constructor(
    private readonly inviteService: InviteService,
    private readonly userService: UserService,
    private readonly projectUserService: ProjectUserService,
  ) {}

  async invite(projectId: number, payload: CreateInviteDto) {
    const user = await this.userService.findOneOrNullByEmail(payload.email);
    if (user) {
      await this.projectUserService.create(projectId, user.id, payload);
    } else {
      await this.inviteService.create(projectId, payload);
    }
    return true;
  }
}
