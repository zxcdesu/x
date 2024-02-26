import { IsDefined, IsInt } from 'class-validator';

export class HandleChannelDto<T = unknown> {
  @IsInt()
  channelId: number;

  @IsDefined()
  value: T;
}
