import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeletePact = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(DeletePact), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const pact = await db.pact.deleteMany({ where: { id } })

  return pact
})
