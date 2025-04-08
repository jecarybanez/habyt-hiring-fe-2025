import { Listing } from "../types/listing";

export type FilterState = {
  cities: string[];
  rentFrom: string;
  rentTo: string;
  shareType: string[];
  bookableOn: string;
  pageSize: number;
};

export type CityOption = {
  label: string;
  value: string;
};

export type FetchCitiesResponse = {
  data: Listing[];
  metadata: {
    pagination: {
      hasNextPage: boolean;
    };
  };
};