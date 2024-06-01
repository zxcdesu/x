import { AttachmentType } from '../enums';

export interface Attachment {
  type: AttachmentType;
  name?: string;
  url: string;
}
