// components/DebouncedNumberInput.tsx
'use client';

import { useEffect, useState } from 'react';

export default function DebouncedNumberInput({
  value,
  onChange,
  placeholder,
  disabled,
  className
}: {
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}) {
  const [localValue, setLocalValue] = useState(value);

  // Update local value when prop changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounce the onChange callback
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(String(localValue));
    }, 300); // 300ms debounce delay
    
    return () => clearTimeout(timer);
  }, [localValue, onChange]);

  return (
    <input
      type="number"
      inputMode="numeric"
      pattern="[0-9]*"
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
    />
  );
}