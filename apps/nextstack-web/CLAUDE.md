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
