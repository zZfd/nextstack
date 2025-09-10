import React, { useState } from 'react'
import { Button, Card, H2, H3, H4, Paragraph, Stack, XStack, YStack } from 'tamagui'

export interface ExampleProps {
  /**
   * Animation preset to apply to interactive elements
   */
  animationPreset?: 'quick' | 'bouncy' | 'lazy' | 'fast' | 'medium' | 'slow'
  
  /**
   * Theme variant to use
   */
  theme?: 'light' | 'dark'
  
  /**
   * Show animation examples
   */
  showAnimations?: boolean
  
  /**
   * Show color palette
   */
  showColors?: boolean
  
  /**
   * Show typography examples
   */
  showTypography?: boolean
}

/**
 * Example component showcasing Visual Pixel Gallery design system
 * Demonstrates theme colors, animations, typography, and spacing
 */
export const Example: React.FC<ExampleProps> = ({
  animationPreset = 'quick',
  theme = 'dark',
  showAnimations = true,
  showColors = true,
  showTypography = true,
}) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null)

  return (
    <YStack
      theme={theme}
      backgroundColor="$background"
      padding="$6"
      gap="$6"
      minHeight={400}
    >
      {/* Header */}
      <YStack gap="$2">
        <H2 color="$foreground" fontWeight="$4">
          Visual Pixel Gallery Design System
        </H2>
        <Paragraph color="$mutedForeground" size="$5">
          Theme: {theme} • Animation: {animationPreset}
        </Paragraph>
      </YStack>

      {/* Interactive Buttons */}
      {showAnimations && (
        <Card
          backgroundColor="$card"
          borderColor="$border"
          borderWidth={1}
          borderRadius="$3"
          padding="$4"
        >
          <H3 color="$cardForeground" marginBottom="$3" fontWeight="$3">
            Interactive Elements
          </H3>
          <XStack gap="$3" flexWrap="wrap">
            <Button
              animation={animationPreset}
              hoverStyle={{ scale: 1.05 }}
              pressStyle={{ scale: 0.95 }}
              backgroundColor="$primary"
              color="$primaryForeground"
              borderRadius="$2"
            >
              Primary Action
            </Button>
            
            <Button
              animation={animationPreset}
              hoverStyle={{ scale: 1.02 }}
              pressStyle={{ scale: 0.98 }}
              backgroundColor="$secondary"
              color="$secondaryForeground"
              borderRadius="$2"
            >
              Secondary
            </Button>
            
            <Button
              animation={animationPreset}
              hoverStyle={{ backgroundColor: '$destructive', scale: 1.02 }}
              pressStyle={{ scale: 0.98 }}
              backgroundColor="transparent"
              borderColor="$destructive"
              borderWidth={1}
              color="$destructive"
              borderRadius="$2"
            >
              Destructive
            </Button>
            
            <Button
              animation={animationPreset}
              hoverStyle={{ backgroundColor: '$muted' }}
              pressStyle={{ scale: 0.98 }}
              backgroundColor="transparent"
              color="$mutedForeground"
              borderRadius="$2"
            >
              Ghost Button
            </Button>
          </XStack>
        </Card>
      )}

      {/* Animated Cards */}
      {showAnimations && (
        <Card
          backgroundColor="$card"
          borderColor="$border"
          borderWidth={1}
          borderRadius="$3"
          padding="$4"
        >
          <H3 color="$cardForeground" marginBottom="$3" fontWeight="$3">
            Animated Cards
          </H3>
          <XStack gap="$4" flexWrap="wrap">
            {['Card 1', 'Card 2', 'Card 3'].map((cardName, index) => (
              <Card
                key={cardName}
                animation={animationPreset}
                hoverStyle={{
                  scale: 1.05,
                  borderColor: '$primary',
                  shadowColor: '$primary',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.2,
                  shadowRadius: 8,
                }}
                pressStyle={{ scale: 0.95 }}
                backgroundColor="$background"
                borderColor={selectedCard === cardName ? '$primary' : '$border'}
                borderWidth={2}
                borderRadius="$3"
                padding="$4"
                minWidth={120}
                cursor="pointer"
                onPress={() => setSelectedCard(selectedCard === cardName ? null : cardName)}
              >
                <H4 color="$foreground" textAlign="center" fontWeight="$2">
                  {cardName}
                </H4>
                <Paragraph
                  color="$mutedForeground"
                  size="$3"
                  textAlign="center"
                  marginTop="$2"
                >
                  Click me
                </Paragraph>
              </Card>
            ))}
          </XStack>
        </Card>
      )}

      {/* Color Palette */}
      {showColors && (
        <Card
          backgroundColor="$card"
          borderColor="$border"
          borderWidth={1}
          borderRadius="$3"
          padding="$4"
        >
          <H3 color="$cardForeground" marginBottom="$3" fontWeight="$3">
            Color Palette
          </H3>
          <YStack gap="$3">
            <XStack gap="$3" flexWrap="wrap">
              <ColorSwatch label="Primary" color="$primary" />
              <ColorSwatch label="Secondary" color="$secondary" />
              <ColorSwatch label="Muted" color="$muted" />
              <ColorSwatch label="Accent" color="$accent" />
            </XStack>
            <XStack gap="$3" flexWrap="wrap">
              <ColorSwatch label="Destructive" color="$destructive" />
              <ColorSwatch label="Success" color="$success" />
              <ColorSwatch label="Warning" color="$warning" />
              <ColorSwatch label="Info" color="$info" />
            </XStack>
          </YStack>
        </Card>
      )}

      {/* Typography */}
      {showTypography && (
        <Card
          backgroundColor="$card"
          borderColor="$border"
          borderWidth={1}
          borderRadius="$3"
          padding="$4"
        >
          <H3 color="$cardForeground" marginBottom="$3" fontWeight="$3">
            Typography Scale
          </H3>
          <YStack gap="$2">
            <H2 color="$foreground" fontWeight="$4">
              Heading H2 (24px)
            </H2>
            <H3 color="$foreground" fontWeight="$3">
              Heading H3 (20px)
            </H3>
            <H4 color="$foreground" fontWeight="$2">
              Heading H4 (18px)
            </H4>
            <Paragraph color="$foreground" size="$5" fontWeight="$2">
              Body Large (16px) - This is the default body text size
            </Paragraph>
            <Paragraph color="$foreground" size="$4">
              Body Medium (14px) - Secondary text content
            </Paragraph>
            <Paragraph color="$mutedForeground" size="$3">
              Body Small (12px) - Captions and labels
            </Paragraph>
          </YStack>
        </Card>
      )}
    </YStack>
  )
}

/**
 * Color swatch component for displaying theme colors
 */
const ColorSwatch: React.FC<{ label: string; color: string }> = ({ label, color }) => (
  <YStack alignItems="center" gap="$2">
    <Stack
      backgroundColor={color}
      width={48}
      height={48}
      borderRadius="$2"
      borderWidth={1}
      borderColor="$border"
    />
    <Paragraph color="$mutedForeground" size="$2" textAlign="center">
      {label}
    </Paragraph>
  </YStack>
)

export default Example