import {
  Button,
  H1,
  Paragraph,
  YStack,
  XStack,
} from '@nextstack/ui'
import { useNavigation } from '../../hooks/useNavigation'

export function HomeScreen() {
  const { getLinkProps } = useNavigation()

  const linkToSignIn = getLinkProps({
    href: '/auth/signin',
  })

  const linkToSignUp = getLinkProps({
    href: '/auth/signup',
  })

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" gap="$8" padding="$4" backgroundColor="$background">
      <YStack gap="$4" alignItems="center">
        <H1 style={{textAlign: 'center'}} color="$color12">
          Welcome to NextStack
        </H1>
        <Paragraph color="$color10" style={{textAlign: 'center'}}>
          A full-stack TypeScript development scaffold built on Monorepo architecture
        </Paragraph>
      </YStack>

      <XStack gap="$4">
        <Button {...linkToSignIn} variant="outlined">
          Sign In
        </Button>
        <Button {...linkToSignUp}>
          Sign Up
        </Button>
      </XStack>
    </YStack>
  )
}