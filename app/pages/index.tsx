import { BlitzPage, Link, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { ButtonFilled, Container, Heading, View } from "@go1d/go1d"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Suspense } from "react"

const Dashboard = () => {
  const currentUser = useCurrentUser()
  if (currentUser) {
    return (
      <View>
        <Link href={Routes.ContractsPage()} passHref>
          <ButtonFilled>View Contracts</ButtonFilled>
        </Link>
      </View>
    )
  }
  return null
}

const Home: BlitzPage = () => {
  return (
    <>
      <View paddingY={9} backgroundColor="accent">
        <Container contain="normal">
          <Heading semanticElement="h1" visualHeadingLevel="Heading 1" color="complementary">
            Welcome to Pact Broker
          </Heading>
          <Heading semanticElement="h5" visualHeadingLevel="Heading 5" color="complementary">
            Powered by Go1
          </Heading>
        </Container>
      </View>
      <Container contain="normal" paddingY={6}>
        <Suspense fallback="Loading...">
          <Dashboard />
        </Suspense>
      </Container>
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
