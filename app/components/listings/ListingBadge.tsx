'use client';

interface ListingBadgeProps {
  shareType: string;
}

export const ListingBadge = ({ shareType }: ListingBadgeProps) => {
  const formatShareType = (type: string) => {
    switch (type) {
      case 'PrivateApartment': return 'Private Apartment';
      case 'PrivateRoom': return 'Private Room';
      case 'SharedRoom': return 'Shared Room';
      case 'Studio': return 'Studio';
      default: return type;
    }
  };

  return (
    <div className="absolute left-2 top-2 text-sm bg-white px-2 py-0.5 rounded-none font-mono tracking-wider uppercase">
      {formatShareType(shareType)}
    </div>
  );
};