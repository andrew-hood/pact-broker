import { ReactNode, Suspense } from "react"
import { Head, useMutation, Link, Routes, Image } from "blitz"
import { Button, ButtonFilled, ButtonMinimal, Container, Heading, View } from "@go1d/go1d"
import { useCurrentUser } from "../hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <ButtonMinimal
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </ButtonMinimal>
      </>
    )
  } else {
    return (
      <View flexDirection="row">
        <Link href={Routes.LoginPage()} passHref>
          <ButtonMinimal>Login</ButtonMinimal>
        </Link>
        <Link href={Routes.SignupPage()} passHref>
          <ButtonFilled color="accent">Sign Up</ButtonFilled>
        </Link>
      </View>
    )
  }
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "Pact Broker"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <View>
        <Container
          contain="normal"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          paddingY={3}
        >
          <Link href={Routes.Home()}>
            <a>
              <Heading semanticElement="h4" visualHeadingLevel="Heading 4">
                PactBroker
              </Heading>
            </a>
          </Link>
          <View>
            <Suspense fallback="Loading...">
              <UserInfo />
            </Suspense>
          </View>
        </Container>
        <View height="calc(100vh - 56px)">{children}</View>
      </View>
    </>
  )
}

export default Layout
