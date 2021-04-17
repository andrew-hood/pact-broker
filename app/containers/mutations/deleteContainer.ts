import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteContainer = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(DeleteContainer),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const container = await db.container.deleteMany({ where: { id } })

    return container
  }
)
