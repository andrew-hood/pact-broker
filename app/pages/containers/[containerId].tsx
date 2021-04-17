import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getContainer from "app/containers/queries/getContainer"
import deleteContainer from "app/containers/mutations/deleteContainer"

export const Container = () => {
  const router = useRouter()
  const containerId = useParam("containerId", "number")
  const [deleteContainerMutation] = useMutation(deleteContainer)
  const [container] = useQuery(getContainer, { id: containerId })

  return (
    <>
      <Head>
        <title>Container {container.id}</title>
      </Head>

      <div>
        <h1>Container {container.id}</h1>
        <pre>{JSON.stringify(container, null, 2)}</pre>

        <Link href={Routes.EditContainerPage({ [containerId]: container.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteContainerMutation({ id: container.id })
              router.push(Routes.ContainersPage())
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

const ShowContainerPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ContainersPage()}>
          <a>Containers</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Container />
      </Suspense>
    </div>
  )
}

ShowContainerPage.authenticate = true
ShowContainerPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowContainerPage
