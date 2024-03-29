import { Transform } from 'class-transformer';
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

  @Transform(({ value }) => value?.trim())
  @IsString()
  @Length(1, 20)
  text: string;

  @ValidateIf((object: CreateButtonDto) => object.type === ButtonType.Url)
  @IsUrl()
  url?: string;

  @ValidateIf((object: CreateButtonDto) => object.type === ButtonType.Phone)
  @IsPhoneNumber()
  phone?: string;
}
