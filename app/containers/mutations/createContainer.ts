import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateContainer = z
  .object({
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(CreateContainer), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const container = await db.container.create({ data: input as any })

  return container
})
