module.exports = {
  extends: [
    'next/core-web-vitals', // Next.js built-in ESLint config
    require.resolve('@lzt/eslint-config/next'), // Our shared Next.js config
  ],
};