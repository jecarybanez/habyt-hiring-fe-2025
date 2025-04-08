// __mocks__/test-utils/listingsMocks.ts
import { Listing } from '@/app/types/listing';

export const mockListing: Listing = {
  referenceId: 'ref-12345',
  bookable: true,
  shareType: 'PrivateApartment',
  currency: 'EUR',
  rentGross: 1200,
  rentNet: 1100,
  discount: 100,
  discountDescription: 'Promotional discount',
  deposit: 2400,
  city: 'Berlin',
  cityTimezone: 'Europe/Berlin',
  countryName: 'Germany',
  countryCode: 'DE',
  matterportUrl: 'https://example.com/tour/123',
  bookingWindow: {
    bookableFrom: '2023-06-01',
    bookableTo: '2023-12-31'
  },
  fees: [
    {
      name: 'Cleaning',
      description: 'Final cleaning fee',
      amount: 80
    }
  ],
  leaseConditions: {
    noticePeriod: {
      amount: 1,
      unit: 'Months',
      type: 'End'
    },
    minimumStay: { amount: 6, unit: 'Months' },
    maximumStay: { amount: 24, unit: 'Months' }
  },
  roomArea: 25,
  roomAreaUnit: 'Sqm',
  roomAmenities: ['WiFi', 'Desk', 'TV'],
  roomDescriptions: [
    {
      language: 'en',
      description: 'Spacious room with natural light'
    }
  ],
  roomImages: [
    {
      url: 'https://example.com/room1.jpg',
      size: 1024
    }
  ],
  apartmentName: 'Modern Berlin Apartment',
  apartmentFloor: '3',
  apartmentBedroomCount: 2,
  apartmentBathroomCount: 1,
  apartmentArea: 60,
  apartmentAreaUnit: 'Sqm',
  apartmentAmenities: ['Kitchen', 'Washing Machine'],
  apartmentDescriptions: [
    {
      language: 'en',
      description: 'Modern apartment in central location'
    }
  ],
  apartmentImages: [
    {
      url: 'https://example.com/apartment1.jpg',
      size: 2048
    }
  ],
  propertyName: 'Central Berlin Residence',
  propertyAddress: '123 Main Street, Berlin',
  propertyStreet: 'Main Street',
  propertyPostalCode: '10115',
  propertyLatitude: 52.5200,
  propertyLongitude: 13.4050,
  propertyAmenities: ['Elevator', 'Bike Storage'],
  propertyDescriptions: [
    {
      language: 'en',
      description: 'Well-maintained property in prime location'
    }
  ],
  propertyImages: [
    {
      url: 'https://example.com/property1.jpg',
      size: 4096
    }
  ]
};

export const mockListingWithoutDiscount: Listing = {
  referenceId: 'ref-12345',
  bookable: true,
  shareType: 'PrivateApartment',
  currency: 'EUR',
  rentGross: 1200,
  rentNet: 1100,
  discount: 0,
  discountDescription: '',
  deposit: 2400,
  city: 'Berlin',
  cityTimezone: 'Europe/Berlin',
  countryName: 'Germany',
  countryCode: 'DE',
  matterportUrl: 'https://example.com/tour/123',
  bookingWindow: {
    bookableFrom: '2023-06-01',
    bookableTo: '2023-12-31'
  },
  fees: [
    {
      name: 'Cleaning',
      description: 'Final cleaning fee',
      amount: 80
    }
  ],
  leaseConditions: {
    noticePeriod: {
      amount: 1,
      unit: 'Months',
      type: 'End'
    },
    minimumStay: { amount: 6, unit: 'Months' },
    maximumStay: { amount: 24, unit: 'Months' }
  },
  roomArea: 25,
  roomAreaUnit: 'Sqm',
  roomAmenities: ['WiFi', 'Desk', 'TV'],
  roomDescriptions: [
    {
      language: 'en',
      description: 'Spacious room with natural light'
    }
  ],
  roomImages: [
    {
      url: 'https://example.com/room1.jpg',
      size: 1024
    }
  ],
  apartmentName: 'Modern Berlin Apartment',
  apartmentFloor: '3',
  apartmentBedroomCount: 2,
  apartmentBathroomCount: 1,
  apartmentArea: 60,
  apartmentAreaUnit: 'Sqm',
  apartmentAmenities: ['Kitchen', 'Washing Machine'],
  apartmentDescriptions: [
    {
      language: 'en',
      description: 'Modern apartment in central location'
    }
  ],
  apartmentImages: [
    {
      url: 'https://example.com/apartment1.jpg',
      size: 2048
    }
  ],
  propertyName: 'Central Berlin Residence',
  propertyAddress: '123 Main Street, Berlin',
  propertyStreet: 'Main Street',
  propertyPostalCode: '10115',
  propertyLatitude: 52.5200,
  propertyLongitude: 13.4050,
  propertyAmenities: ['Elevator', 'Bike Storage'],
  propertyDescriptions: [
    {
      language: 'en',
      description: 'Well-maintained property in prime location'
    }
  ],
  propertyImages: [
    {
      url: 'https://example.com/property1.jpg',
      size: 4096
    }
  ]
};

export const mockListingWithoutImages: Listing = {
  referenceId: 'ref-12345',
  bookable: true,
  shareType: 'PrivateApartment',
  currency: 'EUR',
  rentGross: 1200,
  rentNet: 1100,
  discount: 100,
  discountDescription: 'Promotional discount',
  deposit: 2400,
  city: 'Berlin',
  cityTimezone: 'Europe/Berlin',
  countryName: 'Germany',
  countryCode: 'DE',
  matterportUrl: 'https://example.com/tour/123',
  bookingWindow: {
    bookableFrom: '2023-06-01',
    bookableTo: '2023-12-31'
  },
  fees: [
    {
      name: 'Cleaning',
      description: 'Final cleaning fee',
      amount: 80
    }
  ],
  leaseConditions: {
    noticePeriod: {
      amount: 1,
      unit: 'Months',
      type: 'End'
    },
    minimumStay: { amount: 6, unit: 'Months' },
    maximumStay: { amount: 24, unit: 'Months' }
  },
  roomArea: 25,
  roomAreaUnit: 'Sqm',
  roomAmenities: ['WiFi', 'Desk', 'TV'],
  roomDescriptions: [
    {
      language: 'en',
      description: 'Spacious room with natural light'
    }
  ],
  roomImages: [
    {
      url: '',
      size: 1024
    }
  ],
  apartmentName: 'Modern Berlin Apartment',
  apartmentFloor: '3',
  apartmentBedroomCount: 2,
  apartmentBathroomCount: 1,
  apartmentArea: 60,
  apartmentAreaUnit: 'Sqm',
  apartmentAmenities: ['Kitchen', 'Washing Machine'],
  apartmentDescriptions: [
    {
      language: 'en',
      description: 'Modern apartment in central location'
    }
  ],
  apartmentImages: [
    {
      url: '',
      size: 2048
    }
  ],
  propertyName: 'Central Berlin Residence',
  propertyAddress: '123 Main Street, Berlin',
  propertyStreet: 'Main Street',
  propertyPostalCode: '10115',
  propertyLatitude: 52.5200,
  propertyLongitude: 13.4050,
  propertyAmenities: ['Elevator', 'Bike Storage'],
  propertyDescriptions: [
    {
      language: 'en',
      description: 'Well-maintained property in prime location'
    }
  ],
  propertyImages: [
    {
      url: '',
      size: 4096
    }
  ]
};

export const mockListingWithoutStay: Listing = {
  referenceId: 'ref-12345',
  bookable: true,
  shareType: 'PrivateApartment',
  currency: 'EUR',
  rentGross: 1200,
  rentNet: 1100,
  discount: 100,
  discountDescription: 'Promotional discount',
  deposit: 2400,
  city: 'Berlin',
  cityTimezone: 'Europe/Berlin',
  countryName: 'Germany',
  countryCode: 'DE',
  matterportUrl: 'https://example.com/tour/123',
  bookingWindow: {
    bookableFrom: '2023-06-01',
    bookableTo: '2023-12-31'
  },
  fees: [
    {
      name: 'Cleaning',
      description: 'Final cleaning fee',
      amount: 80
    }
  ],
  leaseConditions: {
    noticePeriod: {
      amount: 1,
      unit: 'Months',
      type: 'End'
    },
    minimumStay: { amount: 0, unit: 'Months' },
    maximumStay: { amount: 0, unit: 'Months' }
  },
  roomArea: 25,
  roomAreaUnit: 'Sqm',
  roomAmenities: ['WiFi', 'Desk', 'TV'],
  roomDescriptions: [
    {
      language: 'en',
      description: 'Spacious room with natural light'
    }
  ],
  roomImages: [
    {
      url: 'https://example.com/room1.jpg',
      size: 1024
    }
  ],
  apartmentName: 'Modern Berlin Apartment',
  apartmentFloor: '3',
  apartmentBedroomCount: 2,
  apartmentBathroomCount: 1,
  apartmentArea: 60,
  apartmentAreaUnit: 'Sqm',
  apartmentAmenities: ['Kitchen', 'Washing Machine'],
  apartmentDescriptions: [
    {
      language: 'en',
      description: 'Modern apartment in central location'
    }
  ],
  apartmentImages: [
    {
      url: 'https://example.com/apartment1.jpg',
      size: 2048
    }
  ],
  propertyName: 'Central Berlin Residence',
  propertyAddress: '123 Main Street, Berlin',
  propertyStreet: 'Main Street',
  propertyPostalCode: '10115',
  propertyLatitude: 52.5200,
  propertyLongitude: 13.4050,
  propertyAmenities: ['Elevator', 'Bike Storage'],
  propertyDescriptions: [
    {
      language: 'en',
      description: 'Well-maintained property in prime location'
    }
  ],
  propertyImages: [
    {
      url: 'https://example.com/property1.jpg',
      size: 4096
    }
  ]
};

export const mockApiResponse = {
  data: [mockListing],
  metadata: {
    pagination: {
      currentPage: 1,
      currentPageSize: 1,
      totalPages: 10,
      hasNextPage: true,
      hasPrevPage: false,
      totalItems: 10
    },
    filters: {},
    sort: {
      field: 'rentNet',
      order: 'asc',
      isConsistent: true
    }
  }
};