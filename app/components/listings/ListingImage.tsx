'use client';

import Image from 'next/image';
import { Listing } from '@/app/types/listing';

interface ListingImageProps {
  listing: Listing;
}

export const ListingImage = ({ listing }: ListingImageProps) => {
  const getMainImage = () => {
    if (listing.propertyImages?.length > 0) return listing.propertyImages[0].url;
    if (listing.apartmentImages?.length > 0) return listing.apartmentImages[0].url;
    if (listing.roomImages?.length > 0) return listing.roomImages[0].url;
    return '/placeholder-image.svg';
  };

  return (
    <div className="relative h-48 w-full">
      <Image
        src={getMainImage()}
        alt={listing.propertyName || 'Property'}
        fill
        style={{ objectFit: 'cover' }}
        priority={false}
      />
    </div>
  );
};