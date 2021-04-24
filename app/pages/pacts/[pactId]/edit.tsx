import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import AuthLayout from "app/core/layouts/AuthLayout"
import getPact from "app/pacts/queries/getPact"
import updatePact from "app/pacts/mutations/updatePact"
import { PactForm, FORM_ERROR } from "app/pacts/components/PactForm"

export const EditPact = () => {
  const router = useRouter()
  const pactId = useParam("pactId", "number")
  const [pact, { setQueryData }] = useQuery(getPact, { id: pactId })
  const [updatePactMutation] = useMutation(updatePact)

  return (
    <>
      <Head>
        <title>Edit Pact {pact.id}</title>
      </Head>

      <div>
        <h1>Edit Pact {pact.id}</h1>
        <pre>{JSON.stringify(pact)}</pre>

        <PactForm
          submitText="Update Pact"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdatePact}
          initialValues={pact}
          onSubmit={async (values) => {
            try {
              const updated = await updatePactMutation({
                id: pact.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowPactPage({ pactId: String(updated.id) }))
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

const EditPactPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditPact />
      </Suspense>

      <p>
        <Link href={Routes.PactsPage()}>
          <a>Pacts</a>
        </Link>
      </p>
    </div>
  )
}

EditPactPage.authenticate = true
EditPactPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>

export default EditPactPage
