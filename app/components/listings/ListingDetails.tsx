'use client';

import { Listing } from '@/app/types/listing';

interface ListingDetailsProps {
  listing: Listing;
}

export const ListingDetails = ({ listing }: ListingDetailsProps) => {
  const getMinimumStay = () => {
    if (!listing.leaseConditions?.minimumStay) return 'Not specified';
    return `${listing.leaseConditions.minimumStay.amount} ${listing.leaseConditions.minimumStay.unit}`;
  };

  return (
    <div className="grid grid-cols-2 gap-2 text-sm mb-4">
      <div className="flex items-center">
        <span className="text-gray-600 mr-1">⏹️ Area:</span>
        <span className="font-medium">{listing.roomArea} {listing.roomAreaUnit}</span>
      </div>
      <div className="flex items-center">
        <span className="text-gray-600 mr-1">🛏️ Bedrooms:</span>
        <span className="font-medium">{listing.apartmentBedroomCount}</span>
      </div>
      <div className="flex items-center">
        <span className="text-gray-600 mr-1">🛁 Bathrooms:</span>
        <span className="font-medium">{listing.apartmentBathroomCount}</span>
      </div>
      <div className="flex items-center">
        <span className="text-gray-600 mr-1">📅 Min stay:</span>
        <span className="font-medium">{getMinimumStay()}</span>
      </div>
    </div>
  );
};