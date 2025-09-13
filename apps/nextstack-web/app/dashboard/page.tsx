'use client';

import { AuthGuard, UserProfile } from '@nextstack/ui';
import { useRouter } from 'next/navigation';

import { authClient } from '../../lib/auth';

export default function DashboardPage() {
  const router = useRouter();

  const handleUnauthenticated = () => {
    router.push('/auth/signin');
  };

  const handleSignOut = () => {
    router.push('/');
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8'>
        <div className='px-4 py-6 sm:px-0'>
          <div className='border-4 border-dashed border-gray-200 rounded-lg'>
            <div className='p-8'>
              <h1 className='text-3xl font-bold text-gray-900 mb-8'>
                Dashboard
              </h1>

              <AuthGuard
                authClient={authClient}
                onUnauthenticated={handleUnauthenticated}
                fallback={
                  <div className='text-center'>
                    <p className='text-gray-600'>Please sign in to continue</p>
                  </div>
                }
              >
                {user => (
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    <div>
                      <h2 className='text-xl font-semibold text-gray-900 mb-4'>
                        User Profile
                      </h2>
                      <UserProfile
                        user={user}
                        authClient={authClient}
                        onSignOut={handleSignOut}
                      />
                    </div>

                    <div>
                      <h2 className='text-xl font-semibold text-gray-900 mb-4'>
                        Welcome!
                      </h2>
                      <p className='text-gray-600'>
                        You are successfully authenticated with Better Auth.
                        This is a protected page that requires authentication.
                      </p>
                    </div>
                  </div>
                )}
              </AuthGuard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
