'use client';

import { Listing } from '@/app/types/listing';

interface ListingPriceProps {
  listing: Listing;
}

export const ListingPrice = ({ listing }: ListingPriceProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: listing.currency || 'EUR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex items-center p-4 justify-between text-sm text-white bg-gray-900">
      <p className='bg-white text-black px-2 py-1'>
        From{' '}
        <span className="font-medium">
          {new Date(listing.bookingWindow.bookableFrom).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          })}
        </span>
      </p>
      <div>
        {listing.discount > 0 && (
          <p className="text-xs text-right">
            <span className='text-gray-300'>from </span>
            <span className='text-red-400 line-through'>
              {formatCurrency(Number(listing.discount) + Number(listing.rentNet))}
            </span>
          </p>
        )}
        <p className="text-xl font-bold">
          <span className={`${listing.discount > 0 && 'text-green-400'}`}>
            {formatCurrency(listing.rentNet)}
          </span>
          <span className="text-sm font-normal"> / month</span>
        </p>
      </div>
    </div>
  );
};