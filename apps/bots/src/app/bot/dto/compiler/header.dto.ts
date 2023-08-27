import { IsString } from 'class-validator';

export class Header {
  @IsString()
  key: string;

  @IsString()
  value: string;
}
