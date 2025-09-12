import { postRouter } from "./routers/post";
import { userRouter } from "./routers/user";
import { router } from "./trpc";

export const appRouter = router({
  post: postRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;