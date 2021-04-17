import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getContract from "app/contracts/queries/getContract"
import updateContract from "app/contracts/mutations/updateContract"
import { ContractForm, FORM_ERROR } from "app/contracts/components/ContractForm"

export const EditContract = () => {
  const router = useRouter()
  const contractId = useParam("contractId", "number")
  const [contract, { setQueryData }] = useQuery(getContract, { id: contractId })
  const [updateContractMutation] = useMutation(updateContract)

  return (
    <>
      <Head>
        <title>Edit Contract {contract.id}</title>
      </Head>

      <div>
        <h1>Edit Contract {contract.id}</h1>
        <pre>{JSON.stringify(contract)}</pre>

        <ContractForm
          submitText="Update Contract"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateContract}
          initialValues={contract}
          onSubmit={async (values) => {
            try {
              const updated = await updateContractMutation({
                id: contract.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowContractPage({ [contractId]: updated.id }))
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

const EditContractPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditContract />
      </Suspense>

      <p>
        <Link href={Routes.ContractsPage()}>
          <a>Contracts</a>
        </Link>
      </p>
    </div>
  )
}

EditContractPage.authenticate = true
EditContractPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditContractPage
