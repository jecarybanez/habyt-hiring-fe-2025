'use client';

import { Listing } from '@/app/types/listing';
import { ListingImage } from './ListingImage';
import { ListingBadge } from './ListingBadge';
import { ListingDetails } from './ListingDetails';
import { ListingAmenities } from './ListingAmenities';
import { ListingPrice } from './ListingPrice';

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard = ({ listing }: ListingCardProps) => {
  return (
    <div className="relative flex flex-col mb-6 border border-gray-200 rounded-none overflow-hidden shadow-sm hover:border-black transition-shadow">
      <ListingImage listing={listing} />
      <ListingBadge shareType={listing.shareType} />
      
      <div className="flex flex-col p-4 grow-1">
        <div className="mb-2">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-900">{listing.propertyName}</h3>
          </div>
          <p className="text-gray-600 text-sm">{listing.propertyAddress}</p>
        </div>
        
        <ListingDetails listing={listing} />
        <ListingAmenities amenities={listing.roomAmenities || []} />
      </div>
      
      <ListingPrice listing={listing} />
    </div>
  );
};