import { IsDefined } from 'class-validator';

export class HandleChannelDto<T = unknown> {
  @IsDefined()
  value: T;
}
