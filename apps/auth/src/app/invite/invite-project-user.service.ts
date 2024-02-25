import { Injectable } from '@nestjs/common';
import { ProjectUserService } from '../project-user/project-user.service';
import { UserService } from '../user/user.service';
import { CreateInviteDto } from './dto/create-invite.dto';
import { InviteService } from './invite.service';

@Injectable()
export class InviteProjectUserService {
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
