import path from 'node:path'

import { config } from 'dotenv'
import type { PrismaConfig } from 'prisma'

// Load environment variables from .env file
config()

export default {
  schema: path.join('prisma', 'schema'),
} satisfies PrismaConfig