import type { Project } from '@/types';
import { projectsMock } from '@/mocks/projects.mock';
import { delay } from '@/utils/delay';
import { generateId } from '@/utils/id';

const store: Project[] = [...projectsMock];

export type ProjectInput = Pick<Project, 'title' | 'description' | 'budget' | 'startDate' | 'endDate' | 'status'>;

export async function getProjects(): Promise<Project[]> {
  return delay([...store]);
}

export async function createProject(input: ProjectInput): Promise<Project> {
  const now = new Date().toISOString();
  const project: Project = {
    ...input,
    id: generateId('project'),
    raisedAmount: 0,
    spentAmount: 0,
    createdAt: now,
    updatedAt: now,
  };
  store.unshift(project);
  return delay(project);
}
