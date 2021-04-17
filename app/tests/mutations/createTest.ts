import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateTest = z
  .object({
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(CreateTest), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const test = await db.test.create({ data: input })

  return test
})
