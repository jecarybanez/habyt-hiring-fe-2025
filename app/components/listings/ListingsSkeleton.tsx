'use client';

export const ListingsSkeleton = () => (
  <div className="flex flex-wrap justify-between">
    {[...Array(12)].map((_, i) => (
      <div key={i} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
        <div className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
      </div>
    ))}
  </div>
);