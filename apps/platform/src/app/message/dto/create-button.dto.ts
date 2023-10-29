import {
  IsEnum,
  IsPhoneNumber,
  IsString,
  IsUrl,
  MaxLength,
  ValidateIf,
} from 'class-validator';
import { ButtonType } from './button-type.enum';

export class CreateButtonDto {
  @IsEnum(ButtonType)
  type: ButtonType;

  @IsString()
  @MaxLength(20)
  text: string;

  @ValidateIf((object: CreateButtonDto) => object.type === ButtonType.Url)
  @IsUrl()
  url?: string;

  @ValidateIf((object: CreateButtonDto) => object.type === ButtonType.Phone)
  @IsPhoneNumber()
  phone?: string;
}
