export type ID = string;

export interface Timestamped {
  createdAt: string; // ISO date
  updatedAt: string;
}

export type SortDirection = 'asc' | 'desc';
