import type { Media, MediaType } from '@zxcdesu/prisma-platform';
import { Exclude } from 'class-transformer';

export class MediaDto implements Media {
  id: number;

  @Exclude()
  messageId: number;

  name: string | null;

  url: string;

  type: MediaType;
}
