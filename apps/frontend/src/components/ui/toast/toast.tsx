'use client';

import { useEffect } from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast = ({ message, isVisible, onClose }: ToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-24 right-4 z-50 animate-in slide-in-from-right-5 fade-in duration-300 md:right-8">
      <div className="flex items-center gap-3 rounded-md bg-[#3483fa] px-6 py-4 text-white shadow-lg shadow-blue-900/20">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
          <Check className="h-4 w-4 text-white" />
        </div>
        <span className="font-medium">{message}</span>
      </div>
    </div>
  );
};
