import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetTest = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetTest), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const test = await db.test.findFirst({ where: { id } })

  if (!test) throw new NotFoundError()

  return test
})
