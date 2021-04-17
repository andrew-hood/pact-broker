import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTests from "app/tests/queries/getTests"

const ITEMS_PER_PAGE = 100

export const TestsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ tests, hasMore }] = usePaginatedQuery(getTests, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {tests.map((test) => (
          <li key={test.id}>
            <Link href={Routes.ShowTestPage({ testId: String(test.id) })}>
              <a>{test.name}</a>
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

const TestsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Tests</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewTestPage()}>
            <a>Create Test</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TestsList />
        </Suspense>
      </div>
    </>
  )
}

TestsPage.authenticate = true
TestsPage.getLayout = (page) => <Layout>{page}</Layout>

export default TestsPage
