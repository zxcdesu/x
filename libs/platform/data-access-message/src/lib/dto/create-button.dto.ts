import { Trim } from '@zxcdesu/util-transformer';
import {
  IsEnum,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Length,
  ValidateIf,
} from 'class-validator';
import { ButtonType } from './button-type.enum';

export class CreateButtonDto {
  @IsEnum(ButtonType)
  type: ButtonType;

  @Trim()
  @IsString()
  @Length(1, 20)
  text: string;

  @ValidateIf(({ type }: CreateButtonDto) => type === ButtonType.Url)
  @IsUrl()
  url?: string;

  @ValidateIf(({ type }: CreateButtonDto) => type === ButtonType.Phone)
  @IsPhoneNumber()
  phone?: string;
}
