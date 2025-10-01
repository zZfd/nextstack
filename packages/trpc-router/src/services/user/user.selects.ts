import type { Prisma } from '@nextstack/database';

/**
 * Shared Select patterns for User queries
 * These provide precise field selection to avoid over-fetching
 */

/**
 * Basic user fields for lists and general use
 */
export const userBasicSelect = {
  id: true,
  email: true,
  name: true,
  emailVerified: true,
  role: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

/**
 * User with relationship counts only
 */
export const userWithCountsSelect = {
  ...userBasicSelect,
  _count: {
    select: {
      posts: true,
      orders: true,
      profiles: true,
    },
  },
} satisfies Prisma.UserSelect;

/**
 * User with limited posts summary for profile pages
 */
export const userWithPostsSummarySelect = {
  ...userWithCountsSelect,
  posts: {
    select: {
      id: true,
      title: true,
      content: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
    where: { status: 'PUBLISHED' },
    orderBy: { createdAt: 'desc' as const },
    take: 10, // Limit posts returned
  },
} satisfies Prisma.UserSelect;

/**
 * Minimal select for operations that only need basic info
 */
export const userMinimalSelect = {
  id: true,
  email: true,
  name: true,
  role: true,
} satisfies Prisma.UserSelect;

/**
 * Select for user stats queries
 */
export const userStatsSelect = {
  ...userBasicSelect,
  _count: {
    select: {
      posts: true,
      orders: true,
      profiles: true,
    },
  },
} satisfies Prisma.UserSelect;
