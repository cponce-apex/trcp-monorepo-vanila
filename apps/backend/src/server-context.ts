import type { CreateWSSContextFnOptions } from '@trpc/server/adapters/ws';
import type { CreateHTTPContextOptions } from '@trpc/server/adapters/standalone';

/** This is how you initialize a context for the server */
export function createContext(_: CreateHTTPContextOptions | CreateWSSContextFnOptions) {
  return {};
}
