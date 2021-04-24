import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreatePact = z
  .object({
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(CreatePact), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const pact = await db.pact.create({ data: input as any })

  return pact
})
