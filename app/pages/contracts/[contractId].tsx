import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getContract from "app/contracts/queries/getContract"
import deleteContract from "app/contracts/mutations/deleteContract"

export const Contract = () => {
  const router = useRouter()
  const contractId = useParam("contractId", "number")
  const [deleteContractMutation] = useMutation(deleteContract)
  const [contract] = useQuery(getContract, { id: contractId })

  return (
    <>
      <Head>
        <title>Contract {contract.id}</title>
      </Head>

      <div>
        <h1>Contract {contract.id}</h1>
        <pre>{JSON.stringify(contract, null, 2)}</pre>

        <Link href={Routes.EditContractPage({ contractId: String(contract.id) })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteContractMutation({ id: contract.id })
              router.push(Routes.ContractsPage())
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

const ShowContractPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.ContractsPage()}>
          <a>Contracts</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Contract />
      </Suspense>
    </div>
  )
}

ShowContractPage.authenticate = true
ShowContractPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowContractPage
