'use client'

import { SignUpScreen } from '@nextstack/app/features/auth/signup-screen'

export default function SignUpPage() {
  return (
    <SignUpScreen
      redirectTo="/dashboard"
      showPasswordStrength={true}
      showTermsCheckbox={true}
      termsLink="/terms"
      privacyLink="/privacy"
    />
  )
}
