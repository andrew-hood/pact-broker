import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteTest = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(DeleteTest), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const test = await db.test.deleteMany({ where: { id } })

  return test
})
