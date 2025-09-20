'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { SignUpForm } from '@/components/forms/SignUpForm';

export default function SignUpPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-sm w-full space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-center">
            Create your NextStack account
          </h1>
          <div className="flex items-center justify-center gap-1">
            <span className="text-lg text-gray-600">
              Or
            </span>
            <span
              className="text-lg text-blue-600 underline cursor-pointer"
              onClick={() => router.push('/auth/signin')}
            >
              sign in to your existing account
            </span>
          </div>
        </div>

        <SignUpForm
          redirectTo="/dashboard"
          showPasswordStrength={true}
          showTermsCheckbox={true}
          termsLink="/terms"
          privacyLink="/privacy"
        />
      </div>
    </div>
  );
}
