// Utility functions
export { cn, Platform, isWeb, isNative } from './lib/utils'

// Core UI components
export { Button } from './components/ui/button'
export { Input } from './components/ui/input'
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card'
export { Label } from './components/ui/label'
export { Checkbox } from './components/ui/checkbox'

// Layout components (using Tailwind classes)
export const YStack = 'div' // Use with className="flex flex-col"
export const XStack = 'div' // Use with className="flex flex-row"

// Typography components (semantic HTML elements)
export const H1 = 'h1' // Use with className="text-4xl font-bold"
export const H2 = 'h2' // Use with className="text-3xl font-semibold"
export const Paragraph = 'p' // Use with className="text-base"
export const Text = 'span' // Use with className="text-sm"