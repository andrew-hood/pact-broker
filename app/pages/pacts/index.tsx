import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import AuthLayout from "app/core/layouts/AuthLayout"
import getPacts from "app/pacts/queries/getPacts"
import { Table, TD, Text, TR, TH } from "@go1d/go1d"
import dayjs from "dayjs"

const ITEMS_PER_PAGE = 100

export const PactsList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ pacts, hasMore }] = usePaginatedQuery(getPacts, {
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
          <TH key="id" text="ID" />,
          <TH key="name" text="Name" />,
          <TH key="payload" text="Payload" />,
          <TH key="updated" text="Updated" />,
          <TH key="created" text="Created" />,
        ]}
        rows={pacts.map((pact) => (
          <TR key="0">
            <TD>
              <Link href={Routes.ShowPactPage({ pactId: String(pact.id) })}>
                <a>{pact.id}</a>
              </Link>
            </TD>
            <TD>
              <Text>{pact.providerId}</Text>
            </TD>
            <TD>
              <Text>{pact.json}</Text>
            </TD>
            <TD>
              <Text>{dayjs(pact.updatedAt).format("DD/MM/YYYY")}</Text>
            </TD>
            <TD>
              <Text>{dayjs(pact.createdAt).format("DD/MM/YYYY")}</Text>
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

const PactsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Pacts</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewPactPage()}>
            <a>Create Pact</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <PactsList />
        </Suspense>
      </div>
    </>
  )
}

PactsPage.authenticate = true
PactsPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>

export default PactsPage
