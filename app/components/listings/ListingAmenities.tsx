'use client';

interface ListingAmenitiesProps {
  amenities: string[];
}

export const ListingAmenities = ({ amenities }: ListingAmenitiesProps) => {
  if (!amenities || amenities.length === 0) return null;

  return (
    <div className="mb-4">
      <h4 className="text-sm font-medium text-gray-700 mb-1">Amenities</h4>
      <div className="flex flex-wrap gap-1">
        {amenities.filter(a => a !== '').slice(0, 3).map((amenity, index) => (
          <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
            {amenity}
          </span>
        ))}
        {amenities.length > 3 && (
          <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
            +{amenities.length - 3} more
          </span>
        )}
      </div>
    </div>
  );
};