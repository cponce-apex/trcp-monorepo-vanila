// Exports from here should be 1st import
import { initTRPC } from '@trpc/server';
import { Context } from 'vm';

const t = initTRPC.context<Context>().create();

export const { router } = t;

export const publicProcedure = t.procedure;
