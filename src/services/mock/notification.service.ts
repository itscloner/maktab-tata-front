import { notificationsMock } from '@/mocks/notifications.mock';
import { delay } from '@/utils/delay';

export async function getNotifications() {
  return delay([...notificationsMock]);
}
