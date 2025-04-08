'use client';

import { Listing } from '@/app/types/listing';
import { ListingCard } from '@/app/components/listings/ListingCard';
import { ListingsSkeleton } from '@/app/components/listings/ListingsSkeleton';
import { ListingsError } from '@/app/components/listings/ListingsError';

interface ListingsContentProps {
  listings: Listing[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  hasMore?: boolean;
  sortOption?: string;
}

export const ListingsContent = ({
  listings,
  loading,
  error,
  onRetry,
  hasMore = false
}: ListingsContentProps) => {

  // Initial loading state (no listings yet)
  if (loading && listings.length === 0) {
    return <ListingsSkeleton />;
  }

  // Error state
  if (error) {
    return <ListingsError error={error} onRetry={onRetry} />;
  }

  // Empty state
  if (listings.length === 0) {
    return (
      <div className="w-full text-center py-8">
        <div className="text-gray-500 text-lg">No listings found</div>
        <p className="text-gray-400 mt-2">
          Try adjusting your filters or search criteria
        </p>
      </div>
    );
  }

  // Normal state with listings
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {listings.map((listing) => (
          <ListingCard key={`${listing.referenceId}-${Date.now}`} listing={listing} />
        ))}
      </div>

      {/* Loading more indicator */}
      {loading && hasMore && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={`skeleton-${i}`} className="bg-gray-100 rounded-lg h-64 animate-pulse"></div>
          ))}
        </div>
      )}
    </>
  );
};