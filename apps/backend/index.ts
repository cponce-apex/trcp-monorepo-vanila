import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import { AppRouter, appRouter } from './src/trcp/app-router';
import { WebSocketServer } from 'ws';
import { createContext } from './src/server-context';
import cors from 'cors';

// http server
const server = createHTTPServer({
  middleware: cors(),
  router: appRouter,
  createContext
});

// ws server
const wss = new WebSocketServer({ server });
applyWSSHandler<AppRouter>({
  wss,
  router: appRouter,
  createContext
});

// setInterval(() => {
//   console.log('Connected clients', wss.clients.size);
// }, 1000);
server.listen(2022);
