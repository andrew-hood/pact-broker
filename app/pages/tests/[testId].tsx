import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTest from "app/tests/queries/getTest"
import deleteTest from "app/tests/mutations/deleteTest"

export const Test = () => {
  const router = useRouter()
  const testId = useParam("testId", "number")
  const [deleteTestMutation] = useMutation(deleteTest)
  const [test] = useQuery(getTest, { id: testId })

  return (
    <>
      <Head>
        <title>Test {test.id}</title>
      </Head>

      <div>
        <h1>Test {test.id}</h1>
        <pre>{JSON.stringify(test, null, 2)}</pre>

        <Link href={Routes.EditTestPage({ testId: String(test.id) })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteTestMutation({ id: test.id })
              router.push(Routes.TestsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowTestPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.TestsPage()}>
          <a>Tests</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Test />
      </Suspense>
    </div>
  )
}

ShowTestPage.authenticate = true
ShowTestPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowTestPage
