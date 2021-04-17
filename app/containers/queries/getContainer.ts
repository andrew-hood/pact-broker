import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetContainer = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetContainer), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const container = await db.container.findFirst({ where: { id } })

  if (!container) throw new NotFoundError()

  return container
})
