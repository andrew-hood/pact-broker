import { Suspense } from "react"
import { Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import { Container, Heading, View } from "@go1d/go1d"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
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
      <View paddingY={6}>
        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>
      </View>
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
