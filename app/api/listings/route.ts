import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { APIResponse, Listing } from '@/app/types/listing';

export async function GET(request: NextRequest) {
  try {
    // Read the JSON file
    const filePath = path.join(process.cwd(), 'public', 'data.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const allData: APIResponse = JSON.parse(fileContents);
    
    // Get URL search parameters for filtering and sorting
    const searchParams = request.nextUrl.searchParams;
    
    // Filter parameters
    const page = parseInt(searchParams.get('page') || '0');
    const pageSize = parseInt(searchParams.get('pageSize') || '100');
    const bookable = searchParams.get('bookable');
    const bookableOn = searchParams.get('bookableOn');
    const bookableFrom = searchParams.get('bookableFrom');
    const bookableTo = searchParams.get('bookableTo');
    const referenceId = searchParams.get('referenceId');
    const countryCodes = searchParams.getAll('countryCode');
    const cities = searchParams.getAll('city');
    const shareTypes = searchParams.getAll('shareType');
    const postalCode = searchParams.get('postalCode');
    const bedroomsFrom = searchParams.get('bedroomsFrom') ? parseInt(searchParams.get('bedroomsFrom')!) : null;
    const bedroomsTo = searchParams.get('bedroomsTo') ? parseInt(searchParams.get('bedroomsTo')!) : null;
    const rentFrom = searchParams.get('rentFrom') ? parseFloat(searchParams.get('rentFrom')!) : null;
    const rentTo = searchParams.get('rentTo') ? parseFloat(searchParams.get('rentTo')!) : null;
    
    // Sorting parameters
    const sortField = searchParams.get('sort') || 'rentNet';
    const sortOrder = searchParams.get('order') || 'asc';
    
    // STAGE 1: Filter ALL data first
    const filteredData = allData.data.filter((listing) => {
      // Apply all filters in a single pass
      if (bookable === 'true' && !listing.bookable) return false;
      if (bookable === 'false' && listing.bookable) return false;
      
      if (bookableOn) {
        const bookableDate = new Date(bookableOn);
        const from = new Date(listing.bookingWindow.bookableFrom);
        const to = new Date(listing.bookingWindow.bookableTo);
        if (!(bookableDate >= from && bookableDate <= to)) return false;
      }
      
      if (bookableFrom) {
        const date = new Date(bookableFrom);
        const to = new Date(listing.bookingWindow.bookableTo);
        if (!(date <= to)) return false;
      }
      
      if (bookableTo) {
        const date = new Date(bookableTo);
        const from = new Date(listing.bookingWindow.bookableFrom);
        if (!(date >= from)) return false;
      }
      
      if (referenceId && listing.referenceId !== referenceId) return false;
      if (countryCodes.length > 0 && !countryCodes.includes(listing.countryCode)) return false;
      if (cities.length > 0 && !cities.includes(listing.city)) return false;
      if (shareTypes.length > 0 && !shareTypes.includes(listing.shareType)) return false;
      if (postalCode && listing.propertyPostalCode !== postalCode) return false;
      if (bedroomsFrom !== null && listing.apartmentBedroomCount < bedroomsFrom) return false;
      if (bedroomsTo !== null && listing.apartmentBedroomCount > bedroomsTo) return false;
      if (rentFrom !== null && listing.rentNet < rentFrom) return false;
      if (rentTo !== null && listing.rentNet > rentTo) return false;
      
      return true;
    });
    
    // STAGE 2: Sort ALL filtered results
    const sortedData = filteredData.sort((a, b) => {
      // Get comparable values for sorting
      const getSortValue = (item: Listing) => {
        switch (sortField) {
          case 'rentNet':
            return item.rentNet;
          case 'bookableFrom':
            return new Date(item.bookingWindow.bookableFrom).getTime();
          case 'roomArea':
            return item.roomArea || 0;
          default:
            return item.rentNet;
        }
      };
      
      const valueA = getSortValue(a);
      const valueB = getSortValue(b);
      
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    });
    
    // STAGE 3: Paginate the properly sorted results
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = sortedData.slice(startIndex, endIndex);
    
    // Build response with metadata
    const response: APIResponse = {
      metadata: {
        pagination: {
          currentPage: page,
          currentPageSize: paginatedData.length,
          totalPages: Math.ceil(sortedData.length / pageSize),
          hasNextPage: endIndex < sortedData.length,
          hasPrevPage: page > 0,
          totalItems: sortedData.length 
        },
        filters: referenceId ? { referenceId } : {},
        sort: {
          field: sortField,
          order: sortOrder,
          isConsistent: true 
        }
      },
      data: paginatedData
    };
    
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching listings data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch listings data' },
      { status: 500 }
    );
  }
}