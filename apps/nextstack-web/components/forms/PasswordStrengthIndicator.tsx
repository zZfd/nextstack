'use client';

import { Stack, HStack, Text } from '@nextstack/ui';

import {
  calculatePasswordStrength,
  PASSWORD_STRENGTH_LABELS,
  PASSWORD_STRENGTH_COLORS
} from '@/utils/auth';

interface PasswordStrengthIndicatorProps {
  password: string;
  showLabel?: boolean;
  showFeedback?: boolean;
}

export function PasswordStrengthIndicator({
  password,
  showLabel = true,
  showFeedback = true
}: PasswordStrengthIndicatorProps) {
  const strength = calculatePasswordStrength(password);

  // Don't show anything if password is empty
  if (!password) {
    return null;
  }

  return (
    <Stack space="$2">
      {/* Strength bars */}
      <HStack space="$1">
        {[0, 1, 2, 3, 4].map((level) => (
          <Stack
            key={level}
            height="$1"
            flex={1}
            backgroundColor={
              level <= strength.score
                ? PASSWORD_STRENGTH_COLORS[strength.score]
                : '$gray4'
            }
            borderRadius="$1"
          />
        ))}
      </HStack>

      {/* Strength label */}
      {showLabel && (
        <Text
          fontSize="$3"
          color={PASSWORD_STRENGTH_COLORS[strength.score]}
          fontWeight="500"
        >
          {PASSWORD_STRENGTH_LABELS[strength.score]}
        </Text>
      )}

      {/* Feedback */}
      {showFeedback && strength.feedback.length > 0 && (
        <Stack space="$1">
          {strength.feedback.map((feedback, index) => (
            <Text
              key={index}
              fontSize="$2"
              color="$gray11"
            >
              • {feedback}
            </Text>
          ))}
        </Stack>
      )}
    </Stack>
  );
}

/**
 * Compact version for inline display
 */
export function PasswordStrengthBadge({ password }: { password: string }) {
  const strength = calculatePasswordStrength(password);

  if (!password) {
    return null;
  }

  return (
    <HStack space="$2" alignItems="center">
      <HStack space="$0.5">
        {[0, 1, 2, 3, 4].map((level) => (
          <Stack
            key={level}
            width="$1"
            height="$1"
            backgroundColor={
              level <= strength.score
                ? PASSWORD_STRENGTH_COLORS[strength.score]
                : '$gray4'
            }
            borderRadius="$1"
          />
        ))}
      </HStack>
      <Text
        fontSize="$2"
        color={PASSWORD_STRENGTH_COLORS[strength.score]}
        fontWeight="500"
      >
        {PASSWORD_STRENGTH_LABELS[strength.score]}
      </Text>
    </HStack>
  );
}