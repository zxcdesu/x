import type { Project } from '@zxcdesu/prisma-platform';

export class ProjectDto implements Project {
  id: number;

  name: string;

  imageUrl: string | null;

  createdAt: Date;

  updatedAt: Date;
}
