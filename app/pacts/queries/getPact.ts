import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetPact = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetPact), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const pact = await db.pact.findFirst({ where: { id } })

  if (!pact) throw new NotFoundError()

  return pact
})
