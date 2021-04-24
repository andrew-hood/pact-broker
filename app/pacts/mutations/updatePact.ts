import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdatePact = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdatePact),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const pact = await db.pact.update({ where: { id }, data: data as any })

    return pact
  }
)
