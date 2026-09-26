import type { ID } from './common';

export type NotificationLevel = 'info' | 'success' | 'warning' | 'error';

export interface AppNotification {
  id: ID;
  title: string;
  message: string;
  level: NotificationLevel;
  date: string;
  read: boolean;
}
