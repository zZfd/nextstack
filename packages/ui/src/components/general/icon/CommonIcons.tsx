import {
  Calendar as CalendarIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
  Plus as PlusIcon,
  Minus as MinusIcon,
  Check as CheckIcon,
  Circle as CircleIcon,
  Search as SearchIcon,
  X as XIcon,
} from '@tamagui/lucide-icons';
import React from 'react';

import { Icon, IconProps } from './Icon';

// Rule 4: Explicit TypeScript interfaces
export interface CommonIconProps extends Omit<IconProps, 'children'> {}

// Common icon wrapper components - Rule 2: Use Icon wrapper consistently
export const Calendar: React.FC<CommonIconProps> = props => (
  <Icon {...props}>
    <CalendarIcon />
  </Icon>
);

export const ChevronLeft: React.FC<CommonIconProps> = props => (
  <Icon {...props}>
    <ChevronLeftIcon />
  </Icon>
);

export const ChevronRight: React.FC<CommonIconProps> = props => (
  <Icon {...props}>
    <ChevronRightIcon />
  </Icon>
);

export const ChevronDown: React.FC<CommonIconProps> = props => (
  <Icon {...props}>
    <ChevronDownIcon />
  </Icon>
);

export const ChevronUp: React.FC<CommonIconProps> = props => (
  <Icon {...props}>
    <ChevronUpIcon />
  </Icon>
);

export const Plus: React.FC<CommonIconProps> = props => (
  <Icon {...props}>
    <PlusIcon />
  </Icon>
);

export const Minus: React.FC<CommonIconProps> = props => (
  <Icon {...props}>
    <MinusIcon />
  </Icon>
);

export const Check: React.FC<CommonIconProps> = props => (
  <Icon {...props}>
    <CheckIcon />
  </Icon>
);

export const Circle: React.FC<CommonIconProps> = props => (
  <Icon {...props}>
    <CircleIcon />
  </Icon>
);

export const Search: React.FC<CommonIconProps> = props => (
  <Icon {...props}>
    <SearchIcon />
  </Icon>
);

export const X: React.FC<CommonIconProps> = props => (
  <Icon {...props}>
    <XIcon />
  </Icon>
);
