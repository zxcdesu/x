import { ButtonType } from '../enums';

export interface Button {
  type: ButtonType;
  text: string;
  url?: string;
  phone?: string;
}
