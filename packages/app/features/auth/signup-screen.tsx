import {
  Button,
  Input,
  YStack,
  XStack,
  Label,
  Text,
  Checkbox,
  Card,
  H2,
  Paragraph,
  Progress,
} from '@nextstack/ui'
import type { JSX } from 'react'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'

export interface SignUpApiData {
  name: string
  email: string
  password: string
}

export interface SignUpFormData extends SignUpApiData {
  confirmPassword: string
  agreeToTerms: boolean
}

export interface SignUpFormProps {
  redirectTo?: string
  onSuccessCallback?: () => void | Promise<void>
  requireEmailVerification?: boolean
  showPasswordStrength?: boolean
  showTermsCheckbox?: boolean
  termsLink?: string
  privacyLink?: string
  disabled?: boolean
}

// Placeholder auth hook
interface AuthOptions {
  redirectTo?: string
  onSuccess?: () => void | Promise<void>
}

interface AuthReturn {
  isLoading: boolean
  error: unknown
  signUp: (data: Record<string, unknown>) => Promise<void>
  clearError: () => void
}

const useAuth = (_options: AuthOptions): AuthReturn => ({
  isLoading: false,
  error: null,
  signUp: async (data: Record<string, unknown>): Promise<void> => {
    // Your existing sign up logic here
    void data
  },
  clearError: (): void => {},
})

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Simple password strength calculation
const calculatePasswordStrength = (password: string): number => {
  let strength = 0
  if (password.length >= 8) strength += 25
  if (/[a-z]/.test(password)) strength += 25
  if (/[A-Z]/.test(password)) strength += 25
  if (/\d/.test(password)) strength += 25
  return Math.min(strength, 100)
}

const getPasswordStrengthColor = (strength: number): string => {
  if (strength < 25) return '$red10'
  if (strength < 50) return '$orange10'
  if (strength < 75) return '$yellow10'
  return '$green10'
}

const getPasswordStrengthText = (strength: number): string => {
  if (strength < 25) return 'Weak'
  if (strength < 50) return 'Fair'
  if (strength < 75) return 'Good'
  return 'Strong'
}

export function SignUpScreen({
  redirectTo = '/',
  onSuccessCallback,
  requireEmailVerification: _requireEmailVerification = false,
  showPasswordStrength = true,
  showTermsCheckbox = true,
  termsLink = '/terms',
  privacyLink = '/privacy',
  disabled = false,
}: SignUpFormProps): JSX.Element {
  const { isLoading, error, signUp, clearError } = useAuth({
    redirectTo,
    onSuccess: onSuccessCallback,
  })

  const [passwordStrength, setPasswordStrength] = useState(0)

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setFocus,
  } = useForm<SignUpFormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  })

  const watchedPassword = watch('password')

  const onSubmit = async (data: SignUpFormData): Promise<void> => {
    if (disabled) return

    clearError()

    const { confirmPassword: _confirmPassword, agreeToTerms: _agreeToTerms, ...signUpData } = data
    await signUp(signUpData)
  }

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" padding="$4" backgroundColor="$background">
      <Card maxWidth={400} width="100%" padding="$6" space="$4">
        <YStack space="$2" alignItems="center">
          <H2>Sign Up</H2>
          <Paragraph color="$color10" style={{textAlign: 'center'}}>
            Create your account to get started.
          </Paragraph>
        </YStack>

        <YStack space="$4">
          <YStack space="$2">
            <Label htmlFor="name">Full Name</Label>
            <Controller
              control={control}
              name="name"
              rules={{
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              }}
              render={({ field }) => (
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  disabled={disabled || isLoading}
                  borderColor={errors.name ? '$red10' : '$borderColor'}
                  onSubmitEditing={() => setFocus('email')}
                  {...field}
                />
              )}
            />
            {errors.name && (
              <Text color="$red10" fontSize="$2">
                {errors.name.message}
              </Text>
            )}
          </YStack>

          <YStack space="$2">
            <Label htmlFor="email">Email</Label>
            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Email is required',
                validate: {
                  isValidEmail: (value: string) =>
                    isValidEmail(value) || 'Please enter a valid email address',
                },
              }}
              render={({ field }) => (
                <Input
                  id="email"
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  disabled={disabled || isLoading}
                  borderColor={errors.email ? '$red10' : '$borderColor'}
                  onSubmitEditing={() => setFocus('password')}
                  {...field}
                />
              )}
            />
            {errors.email && (
              <Text color="$red10" fontSize="$2">
                {errors.email.message}
              </Text>
            )}
          </YStack>

          <YStack space="$2">
            <Label htmlFor="password">Password</Label>
            <Controller
              control={control}
              name="password"
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              }}
              render={({ field }) => (
                <Input
                  id="password"
                  placeholder="Enter your password"
                  secureTextEntry
                  autoComplete="new-password"
                  disabled={disabled || isLoading}
                  borderColor={errors.password ? '$red10' : '$borderColor'}
                  onSubmitEditing={() => setFocus('confirmPassword')}
                  onChangeText={(text) => {
                    field.onChange(text)
                    if (showPasswordStrength) {
                      setPasswordStrength(calculatePasswordStrength(text))
                    }
                  }}
                  value={field.value}
                />
              )}
            />
            {errors.password && (
              <Text color="$red10" fontSize="$2">
                {errors.password.message}
              </Text>
            )}
            {showPasswordStrength && watchedPassword && (
              <YStack space="$1">
                <Progress
                  value={passwordStrength}
                  backgroundColor="$gray5"
                  size="$1"
                >
                  <Progress.Indicator
                    backgroundColor={getPasswordStrengthColor(passwordStrength)}
                    animation="medium"
                  />
                </Progress>
                <Text
                  fontSize="$1"
                  color={getPasswordStrengthColor(passwordStrength)}
                >
                  {getPasswordStrengthText(passwordStrength)}
                </Text>
              </YStack>
            )}
          </YStack>

          <YStack space="$2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: 'Please confirm your password',
                validate: (value: string) =>
                  value === watchedPassword || 'Passwords do not match',
              }}
              render={({ field }) => (
                <Input
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  secureTextEntry
                  autoComplete="new-password"
                  disabled={disabled || isLoading}
                  borderColor={errors.confirmPassword ? '$red10' : '$borderColor'}
                  {...field}
                />
              )}
            />
            {errors.confirmPassword && (
              <Text color="$red10" fontSize="$2">
                {errors.confirmPassword.message}
              </Text>
            )}
          </YStack>

          {showTermsCheckbox && (
            <YStack space="$2">
              <Controller
                control={control}
                name="agreeToTerms"
                rules={{
                  required: 'You must agree to the terms and conditions',
                }}
                render={({ field }) => (
                  <XStack space="$2" alignItems="flex-start">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={disabled || isLoading}
                    />
                    <YStack flex={1}>
                      <Text fontSize="$2" lineHeight="$1">
                        I agree to the{' '}
                        <Text
                          color="$blue10"
                          textDecorationLine="underline"
                          onPress={() => {
                            if (typeof window !== 'undefined') {
                              window.open(termsLink, '_blank')
                            }
                          }}
                        >
                          Terms of Service
                        </Text>{' '}
                        and{' '}
                        <Text
                          color="$blue10"
                          textDecorationLine="underline"
                          onPress={() => {
                            if (typeof window !== 'undefined') {
                              window.open(privacyLink, '_blank')
                            }
                          }}
                        >
                          Privacy Policy
                        </Text>
                      </Text>
                    </YStack>
                  </XStack>
                )}
              />
              {errors.agreeToTerms && (
                <Text color="$red10" fontSize="$2">
                  {errors.agreeToTerms.message}
                </Text>
              )}
            </YStack>
          )}

          {error && (
            <Card backgroundColor="$red1" borderColor="$red7" padding="$3">
              <Text color="$red11">{(error as Error)?.message || 'An error occurred'}</Text>
            </Card>
          )}

          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={disabled || isLoading}
            opacity={disabled || isLoading ? 0.5 : 1}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </YStack>
      </Card>
    </YStack>
  )
}