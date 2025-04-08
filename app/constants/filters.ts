export const SHARE_TYPES = [
  { label: 'Private Apartment', value: 'PrivateApartment' },
  { label: 'Studio', value: 'Studio' },
  { label: 'Private Room', value: 'PrivateRoom' },
  { label: 'Shared Room', value: 'SharedRoom' },
] as const;

export const PAGE_SIZE_OPTIONS = [10, 20, 30, 50, 100] as const;

export const INPUT_CLASSES = "w-full px-3 py-2 border border-black focus:outline-violet-400 hover:outline-2";

export type Option = {
  label: string;
  value: string;
};