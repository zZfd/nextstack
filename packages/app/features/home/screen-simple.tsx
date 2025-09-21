import { Button } from '@nextstack/ui';
import type { JSX } from 'react';

export function HomeScreenSimple(): JSX.Element {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-8 p-4 bg-background">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-4xl font-bold text-foreground">
          Welcome to NextStack
        </h1>
        <p className="text-base text-muted-foreground text-center">
          A full-stack TypeScript development scaffold built on Monorepo
          architecture
        </p>
      </div>

      <div className="flex flex-row gap-4">
        <Button
          variant="outline"
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.location.href = '/auth/signin';
            }
          }}
        >
          Sign In
        </Button>
        <Button
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.location.href = '/auth/signup';
            }
          }}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}
