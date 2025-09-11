import React from 'react';
import { YStack, XStack, Text, Theme } from 'tamagui';

import { CompoundAvatar, StatusAvatar, StatusIndicator, AvatarGroup, Avatar, AvatarFallback, AvatarFallbackText } from './Avatar';
import { Badge, NotificationBadge, StatusBadge } from './Badge';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from './Card';
import { Input, InputWithLabel, SearchInput } from './Input';
import { MyButton } from './MyButton';

export const ComponentShowcase = () => {
  return (
    <YStack space="$6" padding="$6" maxWidth="$maxWidth.lg" marginHorizontal="auto">
      <YStack space="$2" alignItems="center">
        <Text fontSize="$8" fontWeight="bold" color="$color">
          Visual Pixel Gallery Design System
        </Text>
        <Text fontSize="$5" color="$mutedForeground" textAlign="center">
          A comprehensive showcase of all UI components
        </Text>
      </YStack>

      {/* Search Section */}
      <YStack space="$3" alignItems="center">
        <SearchInput 
          size="md" 
          placeholder="Search components, colors, or anything..." 
        />
      </YStack>

      {/* Component Grid */}
      <XStack space="$4" flexWrap="wrap" justifyContent="center">
        
        {/* User Profile Card */}
        <Card width={320} hover animation="scaleIn">
          <CardHeader>
            <XStack space="$3" alignItems="center">
              <StatusAvatar>
                <CompoundAvatar 
                  size="xl"
                  fallback="JD"
                  gradient="brand"
                  fallbackColor="primary"
                />
                <StatusIndicator size="xl" status="online" />
              </StatusAvatar>
              <YStack flex={1}>
                <CardTitle>John Doe</CardTitle>
                <CardDescription>Senior Frontend Developer</CardDescription>
                <XStack space="$2" marginTop="$2">
                  <Badge size="sm" variant="success">Verified</Badge>
                  <Badge size="sm" variant="outline">Pro</Badge>
                </XStack>
              </YStack>
            </XStack>
          </CardHeader>
          <CardContent>
            <YStack space="$3">
              <Text fontSize="$4">
                Passionate about creating beautiful user interfaces with React and TypeScript.
              </Text>
              <YStack space="$2">
                <Text fontSize="$4" fontWeight="500">Skills</Text>
                <XStack space="$2" flexWrap="wrap">
                  <Badge variant="info">React</Badge>
                  <Badge variant="info">TypeScript</Badge>
                  <Badge variant="info">Next.js</Badge>
                  <Badge variant="secondary">Tamagui</Badge>
                </XStack>
              </YStack>
            </YStack>
          </CardContent>
          <CardFooter>
            <XStack space="$2" width="100%">
              <MyButton flex={1} variant="outline">Message</MyButton>
              <MyButton flex={1}>Follow</MyButton>
            </XStack>
          </CardFooter>
        </Card>

        {/* Team Collaboration Card */}
        <Card width={320} hover animation="scaleIn">
          <CardHeader withBorder>
            <XStack alignItems="center" justifyContent="space-between">
              <CardTitle>Team Project</CardTitle>
              <NotificationBadge size="sm" color="primary">3</NotificationBadge>
            </XStack>
            <CardDescription>Frontend Dashboard Redesign</CardDescription>
          </CardHeader>
          <CardContent>
            <YStack space="$4">
              <YStack space="$2">
                <Text fontSize="$4" fontWeight="500">Team Members</Text>
                <XStack space="$2" alignItems="center">
                  <AvatarGroup spacing="tight">
                    <CompoundAvatar size="sm" fallback="SA" fallbackColor="success" />
                    <CompoundAvatar size="sm" fallback="MJ" fallbackColor="warning" />
                    <CompoundAvatar size="sm" fallback="LC" fallbackColor="purple" />
                    <CompoundAvatar size="sm" fallback="RK" fallbackColor="teal" />
                    <Avatar size="sm">
                      <AvatarFallback>
                        <AvatarFallbackText size="sm">+2</AvatarFallbackText>
                      </AvatarFallback>
                    </Avatar>
                  </AvatarGroup>
                  <Text fontSize="$3" color="$mutedForeground">6 members</Text>
                </XStack>
              </YStack>
              
              <YStack space="$2">
                <Text fontSize="$4" fontWeight="500">Progress</Text>
                <XStack space="$2" alignItems="center">
                  <Badge variant="success">75% Complete</Badge>
                  <Badge variant="warning">2 Blockers</Badge>
                </XStack>
              </YStack>
            </YStack>
          </CardContent>
          <CardFooter withBorder>
            <XStack space="$2" width="100%">
              <MyButton flex={1} variant="ghost">View Details</MyButton>
              <MyButton flex={1} variant="outline">Join Team</MyButton>
            </XStack>
          </CardFooter>
        </Card>

        {/* Settings Card */}
        <Card width={320} hover animation="scaleIn">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your profile and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <YStack space="$4">
              <InputWithLabel label="Display Name" required>
                <Input placeholder="Enter your display name" />
              </InputWithLabel>
              
              <InputWithLabel label="Email" required>
                <Input placeholder="your.email@example.com" />
              </InputWithLabel>
              
              <YStack space="$2">
                <Text fontSize="$4" fontWeight="500">Notifications</Text>
                <XStack space="$4" alignItems="center">
                  <XStack space="$2" alignItems="center">
                    <StatusBadge status="online" />
                    <Text fontSize="$4">Email Updates</Text>
                  </XStack>
                  <XStack space="$2" alignItems="center">
                    <StatusBadge status="away" />
                    <Text fontSize="$4">Push Notifications</Text>
                  </XStack>
                </XStack>
              </YStack>
            </YStack>
          </CardContent>
          <CardFooter>
            <XStack space="$2" width="100%">
              <MyButton flex={1} variant="outline">Cancel</MyButton>
              <MyButton flex={1}>Save Changes</MyButton>
            </XStack>
          </CardFooter>
        </Card>

        {/* Notification Center Card */}
        <Card width={320} hover animation="scaleIn">
          <CardHeader>
            <XStack alignItems="center" justifyContent="space-between">
              <CardTitle>Notifications</CardTitle>
              <NotificationBadge size="md" color="destructive">5</NotificationBadge>
            </XStack>
            <CardDescription>Recent activity and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <YStack space="$3">
              {[
                { 
                  avatar: 'SA', 
                  color: 'success' as const, 
                  message: 'Sarah commented on your post', 
                  time: '2m ago',
                  status: 'online' as const,
                  badge: 'comment'
                },
                { 
                  avatar: 'MJ', 
                  color: 'warning' as const, 
                  message: 'Mike liked your design', 
                  time: '5m ago',
                  status: 'busy' as const,
                  badge: 'like'
                },
                { 
                  avatar: 'LC', 
                  color: 'purple' as const, 
                  message: 'Lisa shared your project', 
                  time: '1h ago',
                  status: 'away' as const,
                  badge: 'share'
                },
              ].map((notification, index) => (
                <XStack key={index} space="$3" alignItems="center">
                  <StatusAvatar>
                    <CompoundAvatar 
                      size="sm"
                      fallback={notification.avatar}
                      fallbackColor={notification.color}
                    />
                    <StatusIndicator size="sm" status={notification.status} />
                  </StatusAvatar>
                  <YStack flex={1}>
                    <Text fontSize="$3">{notification.message}</Text>
                    <Text fontSize="$2" color="$mutedForeground">{notification.time}</Text>
                  </YStack>
                  <Badge size="sm" variant="outline">{notification.badge}</Badge>
                </XStack>
              ))}
            </YStack>
          </CardContent>
          <CardFooter>
            <MyButton width="100%" variant="ghost">View All Notifications</MyButton>
          </CardFooter>
        </Card>
      </XStack>

      {/* Theme Demonstration */}
      <YStack space="$4">
        <Text fontSize="$6" fontWeight="bold" textAlign="center">
          Theme Support
        </Text>
        
        <XStack space="$4" justifyContent="center">
          {/* Light Theme Preview */}
          <Theme name="light">
            <Card width={280} hover>
              <CardHeader>
                <CardTitle>Light Theme</CardTitle>
                <CardDescription>Clean and bright interface</CardDescription>
              </CardHeader>
              <CardContent>
                <YStack space="$3">
                  <XStack space="$2">
                    <MyButton size="sm">Primary</MyButton>
                    <MyButton size="sm" variant="outline">Outline</MyButton>
                  </XStack>
                  <XStack space="$2">
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="destructive">Error</Badge>
                  </XStack>
                </YStack>
              </CardContent>
            </Card>
          </Theme>

          {/* Dark Theme Preview */}
          <Theme name="dark">
            <Card width={280} hover>
              <CardHeader>
                <CardTitle>Dark Theme</CardTitle>
                <CardDescription>Modern dark interface</CardDescription>
              </CardHeader>
              <CardContent>
                <YStack space="$3">
                  <XStack space="$2">
                    <MyButton size="sm">Primary</MyButton>
                    <MyButton size="sm" variant="outline">Outline</MyButton>
                  </XStack>
                  <XStack space="$2">
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="destructive">Error</Badge>
                  </XStack>
                </YStack>
              </CardContent>
            </Card>
          </Theme>
        </XStack>
      </YStack>

      {/* Footer */}
      <YStack space="$2" alignItems="center" paddingTop="$6">
        <Text fontSize="$4" color="$mutedForeground" textAlign="center">
          Built with Tamagui • Visual Pixel Gallery Design System
        </Text>
        <XStack space="$2">
          <Badge variant="outline">React</Badge>
          <Badge variant="outline">TypeScript</Badge>
          <Badge variant="outline">Tamagui</Badge>
          <Badge variant="outline">Storybook</Badge>
        </XStack>
      </YStack>
    </YStack>
  );
};