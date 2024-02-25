import { Exclude } from 'class-transformer';
import { User } from '../../prisma.service';

export class UserDto implements User {
  id: number;

  name: string;

  imageUrl: string | null;

  email: string;

  emailConfirmed: boolean;

  phone: string | null;

  phoneConfirmed: boolean;

  @Exclude()
  password: string;

  createdAt: Date;

  updatedAt: Date;
}
