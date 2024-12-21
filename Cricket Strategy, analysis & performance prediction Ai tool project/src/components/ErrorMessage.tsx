import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-start gap-2">
      <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
      <p>{message}</p>
    </div>
  );
}