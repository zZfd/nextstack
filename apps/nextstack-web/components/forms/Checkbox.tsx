'use client';

import { useState } from 'react';

interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: number;
  label?: string;
}

export function Checkbox({
  checked = false,
  onChange,
  disabled = false,
  size = 16,
  label,
}: CheckboxProps) {
  const [internalChecked, setInternalChecked] = useState(checked);

  const isChecked = checked !== undefined ? checked : internalChecked;

  const handleToggle = () => {
    if (disabled) return;

    const newChecked = !isChecked;

    if (checked === undefined) {
      setInternalChecked(newChecked);
    }

    onChange?.(newChecked);
  };

  return (
    <div
      className={`flex items-center gap-2 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
      onClick={handleToggle}
    >
      <div
        className={`
          flex items-center justify-center border-2 rounded-sm
          ${isChecked
            ? 'border-blue-600 bg-blue-600'
            : 'border-gray-400 bg-transparent'
          }
        `}
        style={{ width: size, height: size }}
        onClick={handleToggle}
      >
        {isChecked && (
          <span
            className="text-white font-bold leading-none"
            style={{ fontSize: size * 0.6 }}
          >
            ✓
          </span>
        )}
      </div>

      {label && (
        <span
          className={`text-sm ${disabled ? 'text-gray-500' : 'text-gray-800'} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={handleToggle}
        >
          {label}
        </span>
      )}
    </div>
  );
}