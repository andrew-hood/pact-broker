import { BlitzPage, Link, Routes, Image } from "blitz"
import Layout from "app/core/layouts/Layout"
import { ButtonFilled, ButtonMinimal, Container, Heading, View } from "@go1d/go1d"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { Suspense } from "react"

const CallToActionButton = () => {
  const currentUser = useCurrentUser()

  if (currentUser) {
    return (
      <Link href={Routes.Dashboard()} passHref>
        <ButtonFilled color="accent">Start Now</ButtonFilled>
      </Link>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()} passHref>
          <ButtonFilled color="accent">Sign Up</ButtonFilled>
        </Link>
        <Link href={Routes.LoginPage()} passHref>
          <ButtonMinimal>Login</ButtonMinimal>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  return (
    <>
      <View paddingY={9} backgroundColor="faint">
        <Container contain="wide" flexDirection="row" alignItems="center">
          <View flexBasis={0.6}>
            <Heading semanticElement="h1" visualHeadingLevel="Heading 1">
              Build a better test suite with Contract Tests
            </Heading>
            <Heading semanticElement="h5" visualHeadingLevel="Heading 5">
              Powered by Go1
            </Heading>
            <View marginTop={6} flexDirection="row">
              <Suspense fallback="">
                <CallToActionButton />
              </Suspense>
            </View>
          </View>
          <View flexBasis={0.3}>
            <Image src="/images/splash.svg" width={360} height={360} />
          </View>
        </Container>
      </View>
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
