import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createContainer from "app/containers/mutations/createContainer"
import { ContainerForm, FORM_ERROR } from "app/containers/components/ContainerForm"

const NewContainerPage: BlitzPage = () => {
  const router = useRouter()
  const [createContainerMutation] = useMutation(createContainer)

  return (
    <div>
      <h1>Create New Container</h1>

      <ContainerForm
        submitText="Create Container"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateContainer}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const container = await createContainerMutation(values)
            router.push(`/containers/${container.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.ContainersPage()}>
          <a>Containers</a>
        </Link>
      </p>
    </div>
  )
}

NewContainerPage.authenticate = true
NewContainerPage.getLayout = (page) => <Layout title={"Create New Container"}>{page}</Layout>

export default NewContainerPage
