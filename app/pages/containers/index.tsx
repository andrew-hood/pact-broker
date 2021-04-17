import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getContainers from "app/containers/queries/getContainers"

const ITEMS_PER_PAGE = 100

export const ContainersList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ containers, hasMore }] = usePaginatedQuery(getContainers, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {containers.map((container) => (
          <li key={container.id}>
            <Link href={Routes.ShowContainerPage({ containerId: String(container.id) })}>
              <a>{container.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const ContainersPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Containers</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewContainerPage()}>
            <a>Create Container</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <ContainersList />
        </Suspense>
      </div>
    </>
  )
}

ContainersPage.authenticate = true
ContainersPage.getLayout = (page) => <Layout>{page}</Layout>

export default ContainersPage
