import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import AuthLayout from "app/core/layouts/AuthLayout"
import getPact from "app/pacts/queries/getPact"
import deletePact from "app/pacts/mutations/deletePact"

export const Pact = () => {
  const router = useRouter()
  const pactId = useParam("pactId", "number")
  const [deletePactMutation] = useMutation(deletePact)
  const [pact] = useQuery(getPact, { id: pactId })

  return (
    <>
      <Head>
        <title>Pact {pact.id}</title>
      </Head>

      <div>
        <h1>Pact {pact.id}</h1>
        <pre>{JSON.stringify(pact, null, 2)}</pre>

        <Link href={Routes.EditPactPage({ pactId: String(pact.id) })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deletePactMutation({ id: pact.id })
              router.push(Routes.PactsPage())
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

const ShowPactPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.PactsPage()}>
          <a>Pacts</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Pact />
      </Suspense>
    </div>
  )
}

ShowPactPage.authenticate = true
ShowPactPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>

export default ShowPactPage
