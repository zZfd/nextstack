# Rules for Tamagui Component Development (AI Assistant Guide)

## 🎯 Goal

The goal of this document is to provide a clear and strict set of rules for AI assistants and developers to create high-quality, maintainable, and high-performance Tamagui components within our project. We are committed to building a unified, cross-platform (Web & Expo) shared UI component library.

All component development must strictly adhere to the following principles and rules to ensure code consistency, reusability, and seamless integration with the design system.

---

## Core Principles

1.  **Separation of Concerns**: UI components must be purely presentational units, completely decoupled from business logic.
2.  **Configuration-Driven**: All styling and design decisions must originate from `tamagui.config.ts`.
3.  **Static-First**: Prioritize features that can be optimized at compile time to ensure maximum performance.
4.  **Declarative API**: A component's API (props) should be declarative, describing "what it is," not "how to do something."
5.  **Storybook**: use `@storybook/react-native-web-vite` not `@storybook/react`

---

## 📜 Core Rule Set

### Rule 0: The Presentation-Logic Separation Rule

> Components are purely "dumb" visual units. Their sole responsibility is to render a UI based on the props they receive and to report user interactions via callback functions.

- **0.1: Business Logic is Strictly Prohibited**: Components **MUST NOT** contain any form of business logic. This includes, but is not limited to:
  - API calls (e.g., `fetch`, `axios`, `react-query` hooks).
  - Application-level state management (e.g., hooks from Redux, Zustand, Jotai).
  - Application-level routing/navigation logic (e.g., Next.js `useRouter` or React Navigation `useNavigation`).

- **0.2: Content is Driven by Props**: Components **MUST NOT** hardcode any specific text content or data. All content must be passed in via `props` (e.g., `title`, `description`, `children`).

- **0.3: Internal UI State is Allowed**: Components are permitted to manage their own internal state that is purely for controlling their UI presentation.
  - **ALLOWED**: Using `useState` to control the `isOpen` state of a modal.
  - **PROHIBITED**: Using `useState` to store user data fetched from an API.

### Rule 1: The Token Rule

> All style values must originate from the design system's predefined tokens, eliminating any hardcoded "magic values."

- **1.1: Tokens Must Be Used**: All values related to the design system (colors, spacing, fonts, radii, etc.) **MUST** be fetched from `tamagui.config.ts` using the token syntax ( `$` prefix).
  - **Correct**:
    ```typescript
    padding: "$4",
    backgroundColor: "$blue9",
    fontSize: "$5"
    ```
  - **Incorrect**:
    ```typescript
    padding: 16,
    backgroundColor: "#007AFF",
    fontSize: 16
    ```
- **1.2: No Hardcoding**: **NEVER** hardcode any numeric or string literals in component styles. If a required token is missing, it must first be added to `tamagui.config.ts`.

### Rule 2: The Building Block Rule

> Prioritize the use of Tamagui's core components to maximize the performance benefits of its compile-time optimizations.

- **2.1: Use Core Components**: **MUST** use `XStack`, `YStack`, `Stack`, and `Text` as the fundamental building blocks for layout and text.
- **2.2: Avoid Primitive Elements**: **MUST NOT** directly use React Native's `View`, `Text` or the web's `div`, `span`, except in unavoidable special cases like third-party library integrations.
- **2.3: Semantic Tags**: When targeting the web, **MUST** set the `tag` prop for interactive or semantically significant components to generate the correct HTML tag (e.g., `tag: 'button'`).

### Rule 3: The Variants Rule

> A component's style variations must be defined declaratively using `variants`, not through conditional logic at runtime.

- **3.1: Define States with `variants`**: The primary style variations of a component (e.g., `size`, `variant`, `colorScheme`) **MUST** be defined within the `variants` object of the `styled()` function.
- **3.2: No Conditional Styling**: **MUST NOT** use ternary operators or logical AND (`&&`) in JSX to dynamically toggle style properties or class names. All such logic must be abstracted into `variants`.
- **3.3: `as const` and Defaults**: The `variants` object **MUST** use the `as const` assertion for optimal TypeScript type inference. Additionally, `defaultVariants` **MUST** be provided.
- **3.4: Compound Variants**: For styles that apply only to a specific combination of variants, **MUST** use `compoundVariants`.

### Rule 4: The TypeScript Rule

> Clear and strict type definitions ensure the quality of the component's API and the robustness of the code.

- **4.1: Explicit Props Interface**: Every component **MUST** define an explicit TypeScript `interface` or `type` for its props.
- **4.2: Extend Tamagui Props**: The component's props type **MUST** extend the props type of its base Tamagui component to support all built-in styling and helper props.
  - **Example**: `export type ButtonProps = StackProps & { customProp: string; };`
- **4.3: Prohibit `any`**: The `any` type is **PROHIBITED** in prop definitions.

### Rule 5: The Storybook Rule

> If others don't know how to use it, the component doesn't exist.

- **5.1: Create a Storybook Story**: Every new or modified shared component **MUST** have a corresponding `*.stories.tsx` file.
- **5.2: Cover All Variants**: The stories in Storybook **MUST** clearly demonstrate and cover all of the component's `variants` and key boolean states (e.g., `disabled`, `loading`, `error`).

### Rule 6: The Hybrid Categorization Rule

> Organize components by their function in the file system and Storybook, but build them following the principles of composition and reusability inspired by Atomic Design.

- **6.1: Categorize by Function**: The primary directory structure for components **MUST** be organized by the component's function or purpose. This structure should be mirrored in the Storybook hierarchy. Common categories include:
  - `general`
  - `layout`
  - `forms`
  - `data-display`
  - `feedback`
  - `navigation`
  - `overlay`

- **6.2: Build with Composition**: Development **SHOULD** follow a compositional approach. Create smaller, reusable "atomic" components first, which can then be composed into larger, more complex "molecular" or "organism-level" components.

- **6.3: Example File Structure**:
  ```
  /components
  ├── 📁 general/
  │   ├── 📄 button/
  │   │   ├── Button.tsx
  │   │   └── Button.stories.tsx
  │   └── 📄 icon/
  ├── 📁 forms/
  │   ├── 📄 input/         (atom)
  │   ├── 📄 label/         (atom)
  │   ├── 📄 form-field/      (molecule: composes label and input)
  │   └── 📄 search-bar/      (molecule: composes input and button)
  ├── 📁 layout/
  │   ├── 📄 stack/
  │   └── 📄 grid/
  ├── 📁 data-display/
  │   └── 📄 user-profile-card/ (organism)
  ...
  ```
