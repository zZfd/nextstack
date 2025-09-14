'use client';

import { authClient } from '@nextstack/auth';
import { SignInForm } from '@nextstack/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSuccess = () => {
    router.push('/');
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h1 className='text-center text-3xl font-extrabold text-gray-900'>
            Sign in to NextStack
          </h1>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Or{' '}
            <a
              href='/auth/signup'
              className='font-medium text-blue-600 hover:text-blue-500'
            >
              create a new account
            </a>
          </p>
        </div>

        {error && (
          <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded'>
            {error}
          </div>
        )}

        <SignInForm
          authClient={authClient}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </div>
    </div>
  );
}
