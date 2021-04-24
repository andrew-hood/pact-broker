import { resolver } from "blitz"
import db from "db"
import { UpdateUser } from "app/auth/validations"

export default resolver.pipe(resolver.zod(UpdateUser), async ({ id, firstname, lastname }) => {
  const user = await db.user.update({
    where: { id },
    data: { name: `${firstname} ${lastname}` },
    select: { id: true, name: true, email: true, role: true },
  })

  return user
})
