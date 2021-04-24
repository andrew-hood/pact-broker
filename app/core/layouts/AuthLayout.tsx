import { ReactNode, Suspense } from "react"
import { Head, useMutation, Link, Routes, useRouter } from "blitz"
import { ButtonMinimal, Container, Heading, Spinner, View } from "@go1d/go1d"
import IconLogout from "@go1d/go1d/build/components/Icons/Logout"
import logout from "app/auth/mutations/logout"
import IconInteractive from "@go1d/go1d/build/components/Icons/Interactive"
import IconUser from "@go1d/go1d/build/components/Icons/User"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Content = ({ children }) => {
  const router = useRouter()
  const [logoutMutation] = useMutation(logout)

  return (
    <View flexDirection="row">
      <View height="100vh" padding={5} backgroundColor="faint">
        <Link href={Routes.Home()} passHref>
          <ButtonMinimal icon={IconInteractive} size="lg" />
        </Link>
        <View flexGrow={1} />
        <Link href={Routes.Account()} passHref>
          <ButtonMinimal icon={IconUser} size="lg" />
        </Link>
        <ButtonMinimal
          icon={IconLogout}
          size="lg"
          onClick={async () => {
            await logoutMutation()
            router.push("/")
          }}
        />
      </View>
      <View flexGrow={1} overflow="auto">
        <Container
          contain="wide"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          paddingY={4}
        >
          <Link href={Routes.Home()}>
            <a>
              <Heading semanticElement="h4" visualHeadingLevel="Heading 4">
                PactBroker
              </Heading>
            </a>
          </Link>
        </Container>
        <View height="calc(100vh - 72px)">{children}</View>
      </View>
    </View>
  )
}

const AuthLayout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "Pact Broker"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Suspense fallback={<Spinner />}>
        <Content>{children}</Content>
      </Suspense>
    </>
  )
}

export default AuthLayout
