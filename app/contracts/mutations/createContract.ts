import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateContract = z
  .object({
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(CreateContract), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const contract = await db.contract.create({ data: input })

  return contract
})
