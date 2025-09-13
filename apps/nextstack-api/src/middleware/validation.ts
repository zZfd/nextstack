/**
 * Environment variable validation
 * Validates required environment variables on startup
 */

interface EnvConfig {
  // Server configuration
  PORT?: string;
  NODE_ENV?: string;

  // Database
  DATABASE_URL?: string;

  // Authentication
  JWT_SECRET?: string;
  JWT_EXPIRES_IN?: string;

  // CORS
  CORS_ORIGINS?: string;

  // Rate limiting
  RATE_LIMIT_WINDOW_MS?: string;
  RATE_LIMIT_MAX_REQUESTS?: string;

  // Request timeout
  REQUEST_TIMEOUT_MS?: string;

  // Logging
  LOG_LEVEL?: string;
}

interface ValidationRule {
  required?: boolean;
  defaultValue?: string;
  validator?: (value: string) => boolean;
  description?: string;
}

const envSchema: Record<keyof EnvConfig, ValidationRule> = {
  PORT: {
    defaultValue: '3001',
    validator: value => !isNaN(Number(value)) && Number(value) > 0,
    description: 'Server port number',
  },
  NODE_ENV: {
    defaultValue: 'development',
    validator: value => ['development', 'production', 'test'].includes(value),
    description: 'Environment mode',
  },
  DATABASE_URL: {
    required: true,
    description: 'Database connection string',
  },
  JWT_SECRET: {
    required: process.env.NODE_ENV === 'production',
    defaultValue: 'development-secret-key-change-in-production-needs-32-chars',
    validator: value =>
      process.env.NODE_ENV === 'production'
        ? value.length >= 32
        : value.length >= 8,
    description:
      'JWT signing secret (minimum 32 characters in production, 8 in development)',
  },
  JWT_EXPIRES_IN: {
    defaultValue: '7d',
    description: 'JWT expiration time',
  },
  CORS_ORIGINS: {
    defaultValue: 'http://localhost:3000,http://localhost:5173',
    description: 'Comma-separated list of allowed CORS origins',
  },
  RATE_LIMIT_WINDOW_MS: {
    defaultValue: '900000', // 15 minutes
    validator: value => !isNaN(Number(value)) && Number(value) > 0,
    description: 'Rate limiting window in milliseconds',
  },
  RATE_LIMIT_MAX_REQUESTS: {
    defaultValue: '100',
    validator: value => !isNaN(Number(value)) && Number(value) > 0,
    description: 'Maximum requests per window',
  },
  REQUEST_TIMEOUT_MS: {
    defaultValue: '30000',
    validator: value => !isNaN(Number(value)) && Number(value) > 0,
    description: 'Request timeout in milliseconds',
  },
  LOG_LEVEL: {
    defaultValue: 'info',
    validator: value => ['debug', 'info', 'warn', 'error'].includes(value),
    description: 'Logging level',
  },
};

export function validateEnvironment(): EnvConfig {
  const errors: string[] = [];
  const warnings: string[] = [];
  const validatedEnv: EnvConfig = {};

  // Validate each environment variable
  Object.entries(envSchema).forEach(([key, rule]) => {
    const envKey = key as keyof EnvConfig;
    let value = process.env[envKey];

    // Check if required variable is missing
    if (rule.required && !value) {
      errors.push(
        `Required environment variable ${key} is not set. ${rule.description || ''}`
      );
      return;
    }

    // Use default value if not provided
    if (!value && rule.defaultValue) {
      value = rule.defaultValue;
      if (process.env.NODE_ENV !== 'test') {
        warnings.push(`Using default value for ${key}: ${value}`);
      }
    }

    // Validate value if validator is provided
    if (value && rule.validator && !rule.validator(value)) {
      errors.push(
        `Invalid value for ${key}: ${value}. ${rule.description || ''}`
      );
      return;
    }

    // Set the validated value
    validatedEnv[envKey] = value;
  });

  // Log warnings
  if (warnings.length > 0) {
    console.warn('Environment validation warnings:');
    warnings.forEach(warning => console.warn(`  - ${warning}`));
  }

  // Throw error if validation failed
  if (errors.length > 0) {
    console.error('Environment validation failed:');
    errors.forEach(error => console.error(`  - ${error}`));
    throw new Error(
      `Environment validation failed with ${errors.length} error(s)`
    );
  }

  console.log('✅ Environment validation passed');
  return validatedEnv;
}

// Validate environment on module load
let validatedConfig: EnvConfig;
try {
  validatedConfig = validateEnvironment();
} catch (error) {
  console.error(
    'Failed to start application due to environment validation errors'
  );
  process.exit(1);
}

export const env = validatedConfig;
