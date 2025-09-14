'use client';

import { authClient } from '@nextstack/auth';
import { SignUpForm } from '@nextstack/ui';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  if (success) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gray-50'>
        <div className='max-w-md w-full space-y-8'>
          <div className='text-center'>
            <div className='bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded'>
              Account created successfully! Redirecting to dashboard...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h1 className='text-center text-3xl font-extrabold text-gray-900'>
            Create your NextStack account
          </h1>
          <p className='mt-2 text-center text-sm text-gray-600'>
            Or{' '}
            <a
              href='/auth/signin'
              className='font-medium text-blue-600 hover:text-blue-500'
            >
              sign in to your existing account
            </a>
          </p>
        </div>

        {error && (
          <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded'>
            {error}
          </div>
        )}

        <SignUpForm
          authClient={authClient}
          onSuccess={handleSuccess}
          onError={handleError}
        />
      </div>
    </div>
  );
}
