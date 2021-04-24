import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetPactsInput
  extends Pick<Prisma.PactFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetPactsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { items: pacts, hasMore, nextPage, count } = await paginate({
      skip,
      take,
      count: () => db.pact.count({ where }),
      query: (paginateArgs) => db.pact.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      pacts,
      nextPage,
      hasMore,
      count,
    }
  }
)
