import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { PrismaService } from 'apps/auth/prisma/prisma.service';
import { ProjectController } from './project/project.controller';
import { ProjectService } from './project/project.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      enableControllerDiscovery: true,
      exchanges: [
        {
          name: 'auth',
          type: 'topic',
        },
      ],
      uri: 'amqp://localhost:5672',
      connectionInitOptions: {
        wait: false,
      },
    }),
  ],
  controllers: [ProjectController, UserController],
  providers: [PrismaService, ProjectService, UserService],
})
export class AppModule {}
