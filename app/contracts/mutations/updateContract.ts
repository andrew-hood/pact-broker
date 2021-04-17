import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateContract = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateContract),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const contract = await db.contract.update({ where: { id }, data })

    return contract
  }
)
