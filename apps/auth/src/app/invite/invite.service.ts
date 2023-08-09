import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateInviteDto } from './dto/invite.dto';

@Injectable()
export class InviteService {
  constructor(private readonly prismaService: PrismaService) {}

  create(payload: CreateInviteDto) {
    return this.prismaService.invite.create({
      data: payload,
    });
  }
}
