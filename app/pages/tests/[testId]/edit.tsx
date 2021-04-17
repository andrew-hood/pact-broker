import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTest from "app/tests/queries/getTest"
import updateTest from "app/tests/mutations/updateTest"
import { TestForm, FORM_ERROR } from "app/tests/components/TestForm"

export const EditTest = () => {
  const router = useRouter()
  const testId = useParam("testId", "number")
  const [test, { setQueryData }] = useQuery(getTest, { id: testId })
  const [updateTestMutation] = useMutation(updateTest)

  return (
    <>
      <Head>
        <title>Edit Test {test.id}</title>
      </Head>

      <div>
        <h1>Edit Test {test.id}</h1>
        <pre>{JSON.stringify(test)}</pre>

        <TestForm
          submitText="Update Test"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateTest}
          initialValues={test}
          onSubmit={async (values) => {
            try {
              const updated = await updateTestMutation({
                id: test.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowTestPage({ testId: String(updated.id) }))
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditTestPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTest />
      </Suspense>

      <p>
        <Link href={Routes.TestsPage()}>
          <a>Tests</a>
        </Link>
      </p>
    </div>
  )
}

EditTestPage.authenticate = true
EditTestPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditTestPage
