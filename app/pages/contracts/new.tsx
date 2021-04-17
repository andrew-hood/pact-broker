import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createContract from "app/contracts/mutations/createContract"
import { ContractForm, FORM_ERROR } from "app/contracts/components/ContractForm"

const NewContractPage: BlitzPage = () => {
  const router = useRouter()
  const [createContractMutation] = useMutation(createContract)

  return (
    <div>
      <h1>Create New Contract</h1>

      <ContractForm
        submitText="Create Contract"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateContract}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const contract = await createContractMutation(values)
            router.push(`/contracts/${contract.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.ContractsPage()}>
          <a>Contracts</a>
        </Link>
      </p>
    </div>
  )
}

NewContractPage.authenticate = true
NewContractPage.getLayout = (page) => <Layout title={"Create New Contract"}>{page}</Layout>

export default NewContractPage
