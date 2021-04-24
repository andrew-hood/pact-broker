import { ReactNode } from "react"
import { Head, Link, Routes } from "blitz"
import { Container, Heading, View } from "@go1d/go1d"

type LayoutProps = {
  title?: string
  children: ReactNode
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
          contain="wide"
          flexDirection="row"
          justifyContent="space-around"
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
    </>
  )
}

export default Layout
