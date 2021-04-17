import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createTest from "app/tests/mutations/createTest"
import { TestForm, FORM_ERROR } from "app/tests/components/TestForm"

const NewTestPage: BlitzPage = () => {
  const router = useRouter()
  const [createTestMutation] = useMutation(createTest)

  return (
    <div>
      <h1>Create New Test</h1>

      <TestForm
        submitText="Create Test"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateTest}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const test = await createTestMutation(values)
            router.push(`/tests/${test.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.TestsPage()}>
          <a>Tests</a>
        </Link>
      </p>
    </div>
  )
}

NewTestPage.authenticate = true
NewTestPage.getLayout = (page) => <Layout title={"Create New Test"}>{page}</Layout>

export default NewTestPage
