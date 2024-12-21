import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="flex justify-center">
      <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-900 border-t-transparent" />
    </div>
  );
}