'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type ToastVariant = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  notify: (toast: Omit<ToastMessage, 'id'>) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const notify = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setToasts((current) => [{ id, ...toast }, ...current]);
  }, []);

  useEffect(() => {
    if (toasts.length === 0) return;

    const timers = toasts.map((toast) =>
      window.setTimeout(() => {
        setToasts((current) => current.filter((item) => item.id !== toast.id));
      }, 4500)
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [toasts]);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 bottom-4 z-50 flex max-w-xs flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`rounded-xl border px-4 py-3 shadow-lg transition-opacity duration-300 ${
              toast.variant === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : toast.variant === 'error'
                ? 'bg-rose-50 border-rose-200 text-rose-900'
                : 'bg-sky-50 border-sky-200 text-sky-900'
            }`}
          >
            <div className="font-semibold">{toast.title}</div>
            {toast.description && <p className="text-sm text-current opacity-80">{toast.description}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
