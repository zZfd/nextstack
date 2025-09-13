import { isAuthenticated, isOptionalAuth } from '../middleware/auth';

import { publicProcedure } from './public';

// Protected procedure that requires authentication
export const protectedProcedure = publicProcedure.use(isAuthenticated);

// Optional auth procedure that doesn't require authentication but provides auth context
export const optionalAuthProcedure = publicProcedure.use(isOptionalAuth);
