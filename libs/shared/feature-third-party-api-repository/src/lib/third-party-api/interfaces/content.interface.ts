import { ButtonType } from '../enums';
import { Attachment } from './attachment.interface';

export interface Content {
  text?: string;
  attachments: Attachment[];
  buttons: ButtonType[];
}
