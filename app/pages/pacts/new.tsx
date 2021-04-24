import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import AuthLayout from "app/core/layouts/AuthLayout"
import createPact from "app/pacts/mutations/createPact"
import { PactForm, FORM_ERROR } from "app/pacts/components/PactForm"

const NewPactPage: BlitzPage = () => {
  const router = useRouter()
  const [createPactMutation] = useMutation(createPact)

  return (
    <div>
      <h1>Create New Pact</h1>

      <PactForm
        submitText="Create Pact"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreatePact}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const pact = await createPactMutation(values)
            router.push(`/pacts/${pact.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.PactsPage()}>
          <a>Pacts</a>
        </Link>
      </p>
    </div>
  )
}

NewPactPage.authenticate = true
NewPactPage.getLayout = (page) => <AuthLayout title={"Create New Pact"}>{page}</AuthLayout>

export default NewPactPage
