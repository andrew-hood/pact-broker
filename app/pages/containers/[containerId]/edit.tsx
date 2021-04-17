import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getContainer from "app/containers/queries/getContainer"
import updateContainer from "app/containers/mutations/updateContainer"
import { ContainerForm, FORM_ERROR } from "app/containers/components/ContainerForm"

export const EditContainer = () => {
  const router = useRouter()
  const containerId = useParam("containerId", "number")
  const [container, { setQueryData }] = useQuery(getContainer, { id: containerId })
  const [updateContainerMutation] = useMutation(updateContainer)

  return (
    <>
      <Head>
        <title>Edit Container {container.id}</title>
      </Head>

      <div>
        <h1>Edit Container {container.id}</h1>
        <pre>{JSON.stringify(container)}</pre>

        <ContainerForm
          submitText="Update Container"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateContainer}
          initialValues={container}
          onSubmit={async (values) => {
            try {
              const updated = await updateContainerMutation({
                id: container.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowContainerPage({ containerId: String(updated.id) }))
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

const EditContainerPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditContainer />
      </Suspense>

      <p>
        <Link href={Routes.ContainersPage()}>
          <a>Containers</a>
        </Link>
      </p>
    </div>
  )
}

EditContainerPage.authenticate = true
EditContainerPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditContainerPage
