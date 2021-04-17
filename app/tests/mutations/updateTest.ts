import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateTest = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateTest),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const test = await db.test.update({ where: { id }, data })

    return test
  }
)
