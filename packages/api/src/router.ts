import { postRouter } from "./routers/post";
import { userRouter } from "./routers/user";
import { storageRouter } from "./routers/storage";
import { router } from "./trpc";

export const appRouter = router({
  post: postRouter,
  user: userRouter,
  storage: storageRouter,
});

export type AppRouter = typeof appRouter;