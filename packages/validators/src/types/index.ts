// Re-export all types from schemas
export type {
  CreatePostInput,
  UpdatePostInput,
  GetPostByIdInput,
  GetPostsInput,
  Post,
} from '../schemas/post';

export type {
  CreateUserInput,
  UpdateUserInput,
  GetUserByIdInput,
  GetUserByEmailInput,
  GetUsersInput,
  User,
} from '../schemas/user';

// Re-export generated Prisma types for advanced use cases
export * from '../generated';