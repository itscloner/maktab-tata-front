import type { Expense } from '@/types';
import { expensesMock } from '@/mocks/expenses.mock';
import { delay } from '@/utils/delay';
import { generateId } from '@/utils/id';

const store: Expense[] = [...expensesMock];

export type ExpenseInput = Pick<
  Expense,
  'title' | 'category' | 'amount' | 'date' | 'projectId' | 'projectName'
>;

export async function getExpenses(): Promise<Expense[]> {
  return delay([...store]);
}

export async function createExpense(input: ExpenseInput): Promise<Expense> {
  const now = new Date().toISOString();
  const expense: Expense = {
    ...input,
    id: generateId('expense'),
    documentNumber: `DOC-${Math.floor(50000 + Math.random() * 9999)}`,
    status: 'در انتظار تایید',
    createdAt: now,
    updatedAt: now,
  };
  store.unshift(expense);
  return delay(expense);
}

export async function deleteExpense(id: string): Promise<boolean> {
  const index = store.findIndex((e) => e.id === id);
  if (index === -1) return delay(false);
  store.splice(index, 1);
  return delay(true);
}
