'use client';

export const ListingsError = ({ error, onRetry }: { error: string; onRetry: () => void }) => (
  <div className="w-full text-center py-8">
    <p className="text-red-500 mb-4">Error: {error}</p>
    <button 
      onClick={onRetry}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Retry
    </button>
  </div>
);