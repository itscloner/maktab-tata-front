import { create } from 'zustand';

export type ToastSeverity = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: number;
  message: string;
  severity: ToastSeverity;
}

interface ToastState {
  toasts: Toast[];
  show: (message: string, severity?: ToastSeverity) => void;
  dismiss: (id: number) => void;
}

let counter = 0;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  show: (message, severity = 'success') => {
    counter += 1;
    const id = counter;
    set((s) => ({ toasts: [...s.toasts, { id, message, severity }] }));
    setTimeout(() => {
      set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }));
    }, 3500);
  },
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
