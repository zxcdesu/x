import { UserTokenPayload } from '../user/user-token-payload.interface';

export interface ProjectTokenPayload extends UserTokenPayload {
  project: {
    id: number;
  };
}
