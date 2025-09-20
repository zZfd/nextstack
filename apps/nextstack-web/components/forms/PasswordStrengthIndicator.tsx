'use client';

import React from 'react';

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
    <div className="space-y-2">
      {/* Strength bars */}
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className="h-1 flex-1 rounded-sm"
            style={{
              backgroundColor: level <= strength.score
                ? PASSWORD_STRENGTH_COLORS[strength.score]
                : '#e5e7eb'
            }}
          />
        ))}
      </div>

      {/* Strength label */}
      {showLabel && (
        <div
          className="text-sm font-medium"
          style={{ color: PASSWORD_STRENGTH_COLORS[strength.score] }}
        >
          {PASSWORD_STRENGTH_LABELS[strength.score]}
        </div>
      )}

      {/* Feedback */}
      {showFeedback && strength.feedback.length > 0 && (
        <div className="space-y-1">
          {strength.feedback.map((feedback, index) => (
            <div
              key={index}
              className="text-xs text-gray-600"
            >
              • {feedback}
            </div>
          ))}
        </div>
      )}
    </div>
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
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className="w-1 h-1 rounded-sm"
            style={{
              backgroundColor: level <= strength.score
                ? PASSWORD_STRENGTH_COLORS[strength.score]
                : '#e5e7eb'
            }}
          />
        ))}
      </div>
      <div
        className="text-xs font-medium"
        style={{ color: PASSWORD_STRENGTH_COLORS[strength.score] }}
      >
        {PASSWORD_STRENGTH_LABELS[strength.score]}
      </div>
    </div>
  );
}