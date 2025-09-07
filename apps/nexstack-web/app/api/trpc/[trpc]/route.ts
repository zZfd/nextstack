import { appRouter, createContext } from '@nexstack/api'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createContext({ req: null as any, res: null as any }),
  })

export { handler as GET, handler as POST }