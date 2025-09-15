'use client';

import { Stack, Text } from '@nextstack/ui';
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
    <Stack
      flexDirection="row"
      alignItems="center"
      gap="$2"
      onPress={handleToggle}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      opacity={disabled ? 0.5 : 1}
    >
      <Stack
        width={size}
        height={size}
        borderWidth={2}
        borderColor={isChecked ? '$blue9' : '$gray7'}
        backgroundColor={isChecked ? '$blue9' : 'transparent'}
        borderRadius="$1"
        alignItems="center"
        justifyContent="center"
        onPress={handleToggle}
      >
        {isChecked && (
          <Text
            color="white"
            fontSize={size * 0.6}
            fontWeight="bold"
            lineHeight={size}
          >
            ✓
          </Text>
        )}
      </Stack>

      {label && (
        <Text
          fontSize="$3"
          color={disabled ? '$gray9' : '$gray11'}
          onPress={handleToggle}
          cursor={disabled ? 'not-allowed' : 'pointer'}
        >
          {label}
        </Text>
      )}
    </Stack>
  );
}