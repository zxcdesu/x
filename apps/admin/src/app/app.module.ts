import { Module } from '@nestjs/common';
import { PrismaService } from 'apps/admin/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
