# Fix Code Quality Issues

## Description

Automatically fix lint issues and intelligently resolve TypeScript errors across the monorepo. Follows strict quality standards: no `any` types, no quick fallbacks, find root causes.

## Usage

```
/fix-code
```

## Behavior

When this command is executed, perform the following steps in sequence:

### 1. Identify TypeScript Errors

First, check for TypeScript errors by examining the code.

Execute `pnpm typecheck` to identify:

- Check recently modified files for type issues
- Look for common error patterns
- Identify type mismatches and missing type definitions

### 2. Fix TypeScript Errors Intelligently

For each TypeScript error found, apply proper fixes following these strict rules:

**FORBIDDEN Fixes (DO NOT USE):**

- ❌ Using `any` type
- ❌ Adding fallbacks like `|| undefined`, `|| null`
- ❌ Using conditional spreads like `input.categoryId && {...}`
- ❌ Type casting to `any`
- ❌ Adding `@ts-ignore` or `@ts-expect-error`
- ❌ Making things unnecessarily complicated

**REQUIRED Approach:**

- ✅ Find the root cause of the type error
- ✅ Fix at the source (type definitions, function signatures)
- ✅ Ensure type safety is maintained
- ✅ Keep solutions simple and clean (KISS principle)
- ✅ Preserve existing functionality
- ✅ If a simple fix isn't possible, leave it unfixed and report it

**Common Fix Patterns:**

1. **Missing type definitions** → Add proper types/interfaces
2. **Type mismatches** → Align types at the source
3. **Optional chaining issues** → Fix the type definitions, not add bandaids
4. **Import errors** → Fix import paths and type exports
5. **Generic type issues** → Properly define generic constraints

### 3. Run ESLint Auto-Fix

Execute `pnpm lint:fix` to automatically fix linting issues.

**What gets fixed:**

- Code style violations
- Import ordering issues
- Unused variables/imports (unless they're needed for types)
- Formatting inconsistencies
- TypeScript-related lint rules

### 4. Format Code with Prettier

Execute `pnpm format` to ensure consistent formatting.

### 5. Verify Fixes Don't Break Functionality

After making changes:

- Verify that function signatures remain compatible
- Ensure existing logic is preserved
- Check that type safety is improved, not compromised
- Confirm no breaking changes to public APIs

### 6. Report Results

Provide a detailed summary:

```
TypeScript Errors:
- Fixed X errors by [brief description of fix approach]
- Left Y errors unfixed (no simple solution available)
  → [List unfixed errors with file:line references]

ESLint Auto-fix:
- Fixed Z files across N packages
- Auto-fixed: [list issue types]

Prettier Formatting:
- Formatted M files

Unfixed Issues Requiring Manual Review:
[List any issues that need deeper investigation]
```

## Important Rules

**Type Safety:**

- Never sacrifice type safety for convenience
- Always prefer stricter types over looser ones
- Use proper TypeScript features (union types, generics, type guards)

**Code Quality:**

- Follow KISS principle - keep it simple
- Maintain existing patterns and architecture
- Use `@` path aliases, not relative imports
- Follow rules in `CLAUDE.md`

**Constraints:**

- DO NOT use `var` keyword
- DO NOT use `any` type
- All code must be in English

## Fix Strategy Examples

### Example 1: Type Mismatch

❌ Bad: `const result = data as any`
✅ Good: Fix the type definition of `data` to match expected type

### Example 2: Optional Property

❌ Bad: `user.name || undefined`
✅ Good: Update the type definition to `name?: string` if it's optional

### Example 3: Missing Generic

❌ Bad: `function process(items: any[])`
✅ Good: `function process<T extends BaseItem>(items: T[])`

## When to Use

Use this command:

- After making code changes that introduce type errors
- Before committing to ensure type safety
- When fixing bugs to prevent regression
- After merging branches with conflicts
- To maintain code quality standards
