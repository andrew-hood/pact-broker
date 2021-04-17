import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateContainer = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateContainer),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const container = await db.container.update({ where: { id }, data })

    return container
  }
)
