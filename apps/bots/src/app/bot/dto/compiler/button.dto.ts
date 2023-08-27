import {
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  ValidateIf,
} from 'class-validator';

export enum ButtonType {
  QuickReply = 'QuickReply',
  Url = 'Url',
  Phone = 'Phone',
}

export class Button {
  @IsEnum(ButtonType)
  type: ButtonType;

  @IsString()
  text: string;

  @ValidateIf(({ type }) => type === ButtonType.Url)
  @IsString()
  @IsUrl()
  url?: string;

  @ValidateIf(({ type }) => type === ButtonType.Phone)
  @IsString()
  @IsPhoneNumber()
  phone?: string;

  @IsOptional()
  @IsString()
  next?: string;
}
