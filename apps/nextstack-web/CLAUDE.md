## @nextstack/ui Strict Mode Instructions

**Golden Rule:** You MUST exclusively use @nextstack/ui components for all UI elements. The use of primitives like web's `div`/`span` is strictly forbidden.

1.  **Layout & Structure:** Use `@nextstack/ui`'s `XStack` and `Stack` for all layout purposes.
2.  **Text Content:** Use `@nextstack/ui`'s `Text` component for all text rendering.
3.  **Styling:** All styling MUST be applied via @nextstack/ui style props using theme tokens (e.g., `padding="$4"`, `backgroundColor="$background"`). The `style` prop with inline objects (e.g., `style={{ color: 'red' }}`) is forbidden.
4.  **Semantics (Web):** For semantic HTML elements, use the `tag` prop on a Tamagui component (e.g., `<Stack tag="main">`, `<XStack tag="nav">`). Do not use raw `main` or `nav` tags.

**All code generated must adhere to these rules without exception.**

Here are some examples to follow:

**DO THIS (✅):**

```
<XStack gap="$2" ai="center">
<Avatar size="$4" circular>
<Avatar.Image src="..."/>
<Avatar.Fallback bc="$green5" />
  </Avatar>
  <Text fontSize="$5" color="$color">Username</Text>
</XStack>
```

**NOT THIS (❌):**

```
<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
  <img src="..." style={{ width: 40, height: 40, borderRadius: '50%' }} />
  <p style={{ fontSize: 16, color: '#333' }}>Username</p>
</div>
```

## Import Path Requirements

**Golden Rule:** You MUST use absolute imports with `@/` prefix for all project imports. Relative imports are strictly forbidden.

1. **Project Imports:** Always use `@/` prefix for importing components, utilities, types, or any project files.
2. **External Packages:** Keep external package imports unchanged (e.g., `react`, `@nextstack/ui`).
3. **Consistency:** This ensures consistent import patterns and easier refactoring.

**All imports must follow this pattern without exception.**

Here are examples to follow:

**DO THIS (✅):**

```tsx
// Component imports
import { Button } from '@/components/ui/button'
import { UserCard } from '@/components/user/user-card'

// Utility imports
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/class-names'

// Type imports
import type { User } from '@/types/user'
import type { ApiResponse } from '@/types/api'

// Hook imports
import { useAuth } from '@/hooks/use-auth'
import { useLocalStorage } from '@/hooks/use-local-storage'

// External packages (unchanged)
import React from 'react'
import { XStack, Text } from '@nextstack/ui'
```

**NOT THIS (❌):**

```tsx
// Relative imports are forbidden
import { Button } from '../ui/button'
import { UserCard } from './user-card'
import { formatDate } from '../../lib/utils'
import { cn } from '../../../lib/class-names'

// Mixed relative and absolute patterns
import type { User } from './types/user'
import { useAuth } from '../hooks/use-auth'
```
