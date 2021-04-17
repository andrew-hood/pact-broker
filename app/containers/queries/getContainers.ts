import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetContainersInput
  extends Pick<Prisma.ContainerFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetContainersInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const { items: containers, hasMore, nextPage, count } = await paginate({
      skip,
      take,
      count: () => db.container.count({ where }),
      query: (paginateArgs) => db.container.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      containers,
      nextPage,
      hasMore,
      count,
    }
  }
)
