import { router } from './init';
import { greetingRouter } from './routes/greeting-router';
import { postRouter } from './routes/post-router/post-router';

// Merge routers together
export const appRouter = router({
  greeting: greetingRouter,
  post: postRouter
});

export type AppRouter = typeof appRouter;
