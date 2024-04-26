import { Project } from '@zxcdesu/prisma-account';

export class ProjectDto implements Project {
  id: number;

  name: string;

  imageUrl: string | null;

  createdAt: Date;

  updatedAt: Date;
}
