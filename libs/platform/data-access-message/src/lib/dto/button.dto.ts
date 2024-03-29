import { ButtonType } from './button-type.enum';

export class ButtonDto {
  type: ButtonType;

  text: string;

  url?: string;

  phone?: string;
}
