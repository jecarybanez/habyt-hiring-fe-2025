import { NextRequest } from 'next/server';
import { APIResponse, Listing } from '@/app/types/listing';

export const createMockRequest = (url: string, params: Record<string, string | string[]> = {}): NextRequest => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => searchParams.append(key, v));
    } else {
      searchParams.set(key, value);
    }
  });

  console.log("url", `http://localhost${url}?${searchParams.toString()}`)

  return new NextRequest(`http://localhost${url}?${searchParams.toString()}`, {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const createMockListings = (count: number): Listing[] => {
  return Array.from({ length: count }, (_, i) => ({
    referenceId: `ref-${i}`,
    bookable: i % 2 === 0,
    shareType: ['PrivateApartment', 'Studio', 'PrivateRoom', 'SharedRoom'][i % 4] as 
      'PrivateApartment' | 'Studio' | 'PrivateRoom' | 'SharedRoom',
    currency: 'EUR',
    rentGross: 1000 + (i * 100),
    rentNet: 900 + (i * 90),
    discount: 10,
    deposit: 2000 + (i * 200),
    city: ['Berlin', 'Munich', 'Hamburg', 'Cologne'][i % 4],
    cityTimezone: 'Europe/Berlin',
    countryName: 'Germany',
    countryCode: 'DE',
    bookingWindow: {
      bookableFrom: new Date(Date.now() - (i * 86400000)).toISOString(),
      bookableTo: new Date(Date.now() + (30 * 86400000) + (i * 86400000)).toISOString(),
    },
    fees: [],
    leaseConditions: {
      noticePeriod: {
        amount: 1,
        unit: 'Months',
        type: 'End',
      },
      minimumStay: { amount: 6, unit: 'Months' },
      maximumStay: { amount: 24, unit: 'Months' },
    },
    roomArea: 20 + i,
    roomAreaUnit: 'Sqm',
    roomAmenities: ['WiFi', 'Desk'],
    roomDescriptions: [{ language: 'en', description: `Room ${i}` }],
    roomImages: [{ url: `https://example.com/room${i}.jpg`, size: 1024 }],
    apartmentName: `Apartment ${i}`,
    apartmentFloor: `${i % 5}`,
    apartmentBedroomCount: 1 + (i % 3),
    apartmentBathroomCount: 1,
    apartmentArea: 50 + (i * 5),
    apartmentAreaUnit: 'Sqm',
    apartmentAmenities: ['Kitchen', 'Washing Machine'],
    apartmentDescriptions: [{ language: 'en', description: `Apartment ${i}` }],
    apartmentImages: [{ url: `https://example.com/apartment${i}.jpg`, size: 2048 }],
    propertyName: `Property ${i}`,
    propertyAddress: `Street ${i}, ${['Berlin', 'Munich', 'Hamburg', 'Cologne'][i % 4]}`,
    propertyStreet: `Street ${i}`,
    propertyPostalCode: `10${i}${i}`,
    propertyLatitude: 52.52 + (i * 0.01),
    propertyLongitude: 13.40 + (i * 0.01),
    propertyAmenities: ['Elevator', 'Bike Storage'],
    propertyDescriptions: [{ language: 'en', description: `Property ${i}` }],
    propertyImages: [{ url: `https://example.com/property${i}.jpg`, size: 4096 }],
  }));
};

export const createMockAPIResponse = (listings: Listing[], page = 0, pageSize = 10, totalItems?: number): APIResponse => {
  const total = totalItems ?? listings.length;
  const totalPages = Math.ceil(total / pageSize);
  const paginatedData = listings.slice(page * pageSize, (page + 1) * pageSize);

  return {
    metadata: {
      pagination: {
        currentPage: page,
        currentPageSize: paginatedData.length,
        totalPages,
        hasNextPage: page < totalPages - 1,
        hasPrevPage: page > 0,
        totalItems: total,
      },
      filters: {},
      sort: {
        field: 'rentNet',
        order: 'asc',
        isConsistent: true,
      },
    },
    data: paginatedData,
  };
};