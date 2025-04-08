'use client';

import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { FilterBar } from '@/app/components/filters/FilterBar';
import { RootState } from '@/app/store';
import { fetchListings, setPage } from '@/app/features/listings/listingsSlice';
import { useAppDispatch } from '@/app/hooks/store';
import { ListingsContent } from '../components/listings/ListingsContent';

export default function Listings() {
  const dispatch = useAppDispatch();
  const { 
    data: listings, 
    loading, 
    error,
    pagination,
  } = useSelector((state: RootState) => state.listings);
  
  const filters = useSelector((state: RootState) => state.filters);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  // Fetch listings when filters change
  useEffect(() => {
    dispatch(setPage(1)); // Always start at page 1 when filters change
    dispatch(fetchListings());
  }, [dispatch, filters]);

  // Infinite scroll implementation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && pagination.hasNextPage) {
          dispatch(setPage(pagination.currentPage + 1));
          dispatch(fetchListings());
        }
      },
      { threshold: 0.1 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loading, pagination.hasNextPage, dispatch]);

  const handleRetry = () => {
    dispatch(fetchListings());
  };

  return (
    <main className="max-w-7xl mx-auto p-4">
      <FilterBar />
      
      <ListingsContent 
        listings={listings} 
        loading={loading} 
        error={error} 
        onRetry={handleRetry}
      />

      {/* Simplified infinite scroll trigger */}
      <div ref={loaderRef} className="h-10 w-full">
        {!loading && pagination.hasNextPage && (
          <div className="text-center py-4">Loading more listings...</div>
        )}
      </div>
      {showBackToTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-4 right-4 bg-black text-white py-1 px-2 rounded-sm shadow-lg text-sm cursor-pointer"
        >
          ⇧ Top
        </button>
      )}
    </main>
  );
}