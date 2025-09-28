import helmet from 'helmet';

/**
 * Security middleware configuration using Helmet
 * Provides various security headers for HTTP responses
 */
export const createSecurityMiddleware = () => {
  return helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
      },
    },
    hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true,
    },
    // Disable the X-Powered-By header
    hidePoweredBy: true,
    // Enable additional security headers
    noSniff: true,
    xssFilter: false, // Modern browsers handle this better
    frameguard: { action: 'sameorigin' },
  });
};
