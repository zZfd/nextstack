// Core exports
export { createAppRouter, type AppRouter } from "./src/router";
export { createContext, createExpressContext, type Context } from "./src/context";
export { createAuthFromConfig, createAuthHandler, type Auth } from "./src/auth";

// Layered architecture exports
export * from "./src/services";
export * from "./src/errors";
export * from "./src/utils/error-handler";

// Procedure exports
export { publicProcedure } from "./src/procedures/public";
export { protectedProcedure, optionalAuthProcedure } from "./src/procedures/protected";

// Middleware exports
export { isAuthenticated, isOptionalAuth } from "./src/middleware/auth";