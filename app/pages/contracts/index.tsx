import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getContracts from "app/contracts/queries/getContracts"
import { ButtonFilled, Container, Table, TD, Text, TR, View } from "@go1d/go1d"
import TableHeaderCell from "@go1d/go1d/build/components/Table/TH"
import dayjs from "dayjs"

const ITEMS_PER_PAGE = 100

export const ContractsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ contracts, hasMore }] = usePaginatedQuery(getContracts, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <Table
        backgroundColor="background"
        header={[
          <TableHeaderCell key="id" text="ID" />,
          <TableHeaderCell key="name" text="Name" />,
          <TableHeaderCell key="payload" text="Payload" />,
          <TableHeaderCell key="updated" text="Updated" />,
          <TableHeaderCell key="created" text="Created" />,
        ]}
        rows={contracts.map((contract) => (
          <TR key="0">
            <TD>
              <Link href={Routes.ShowContractPage({ contractId: String(contract.id) })}>
                <a>{contract.id}</a>
              </Link>
            </TD>
            <TD>
              <Text>{contract.name}</Text>
            </TD>
            <TD>
              <Text>{contract.payload}</Text>
            </TD>
            <TD>
              <Text>{dayjs(contract.updatedAt).format("DD/MM/YYYY")}</Text>
            </TD>
            <TD>
              <Text>{dayjs(contract.createdAt).format("DD/MM/YYYY")}</Text>
            </TD>
          </TR>
        ))}
      />

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const ContractsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Contracts</title>
      </Head>

      <View backgroundColor="faint">
        <Container contain="normal" paddingY={4}>
          <View marginBottom={3} alignItems="flex-start">
            <Link href={Routes.NewContractPage()}>
              <ButtonFilled color="accent">Create Contract</ButtonFilled>
            </Link>
          </View>

          <Suspense fallback={<div>Loading...</div>}>
            <ContractsList />
          </Suspense>
        </Container>
      </View>
    </>
  )
}

ContractsPage.authenticate = true
ContractsPage.getLayout = (page) => <Layout>{page}</Layout>

export default ContractsPage
