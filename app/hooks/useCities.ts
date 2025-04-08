import { useState, useEffect } from 'react';
import { FetchCitiesResponse } from '@/app/types/filters';

export const useCities = () => {
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllCities = async () => {
      try {
        setLoading(true);
        const allCities = new Set<string>();
        let currentPage = 0;
        let hasMorePages = true;

        while (hasMorePages) {
          const response = await fetch(`/api/listings?page=${currentPage}&pageSize=100`);
          if (!response.ok) throw new Error('Failed to fetch cities');
          
          const data: FetchCitiesResponse = await response.json();
          
          data.data.forEach((listing) => {
            if (listing.city) allCities.add(listing.city);
          });

          hasMorePages = data.metadata.pagination.hasNextPage;
          currentPage++;
        }

        setAvailableCities(Array.from(allCities).sort());
      } catch (error) {
        console.error('Error fetching cities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCities();
  }, []);

  return { availableCities, loading };
};