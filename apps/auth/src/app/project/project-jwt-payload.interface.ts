import { RoleType } from '../prisma.service';
import { UserJwtPayload } from '../user/user-jwt-payload.interface';

export interface ProjectJwtPayload extends UserJwtPayload {
  project: {
    id: number;
    roles: RoleType[];
  };
}
