import { Prisma } from '@zxcdesu/prisma-auth';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateUserDto implements Prisma.UserUncheckedCreateInput {
  @Transform(({ value }) => value?.trim())
  @IsString()
  @Length(1, 120)
  name: string;

  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsString()
  @Length(8, 80)
  password: string;
}
