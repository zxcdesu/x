import { Project } from '@zxcdesu/prisma-auth';

export class ProjectDto implements Project {
  id: number;

  name: string;

  description: string;

  imageUrl: string | null;

  createdAt: Date;

  updatedAt: Date;
}
