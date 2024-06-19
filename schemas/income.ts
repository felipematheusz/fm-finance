import { z } from 'zod'

const incomeSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  value: z.coerce.number(),
})

export { incomeSchema }

