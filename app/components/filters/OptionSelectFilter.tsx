'use client';

import { Option } from '@/app/constants/filters';
import { useState } from 'react';

interface OptionSelectFilterProps {
  label: string;
  options: Option[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  isCompact?: boolean;
  loading?: boolean;
}

export default function OptionSelectFilter({
  label,
  options,
  selectedValues,
  onChange,
  loading = false,
  isCompact = false,
}: OptionSelectFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter((v) => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        className={`w-full p-2 border border-black flex justify-between items-center bg-white cursor-pointer hover:border-2 hover:p-[calc(var(--spacing)*2-1px)] 
          ${isOpen && 'border-violet-400 border-2 p-[calc(var(--spacing)*2-1px)]'} 
          ${ loading ? 'opacity-50 cursor-not-allowed' : '' } 
          ${isCompact && 'text-sm'}`}
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
      >
        
        
        {loading ? (
          <span className="ml-2 text-gray-500 text-md">Loading...</span>
        ) : (<>
          <span className="text-md font-medium text-gray-700">
            {label}: {selectedValues.length ? `${selectedValues.length} selected` : 'Any'}
          </span>
          <svg
            className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </>)}
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-1 w-full bg-white shadow-lg border border-black p-2 max-h-60 overflow-auto">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedValues.includes(option.value)}
                onChange={() => handleToggle(option.value)}
                className="h-4 w-4 text-violet-500 border-gray-300 rounded focus:ring-violet-400"
              />
              <span className="ml-2 text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
} 