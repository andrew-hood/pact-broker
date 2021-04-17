import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteContract = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(DeleteContract), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const contract = await db.contract.deleteMany({ where: { id } })

  return contract
})
