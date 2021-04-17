import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { ConnectingShapes, Container, Heading, View } from "@go1d/go1d"

const Dashboard: BlitzPage = () => {
  return (
    <>
      <View paddingY={8} backgroundColor="accent">
        <Container contain="normal">
          <Heading semanticElement="h1" visualHeadingLevel="Heading 1" color="complementary">
            Welcome Andrew
          </Heading>
        </Container>
      </View>
      <View backgroundColor="faint">
        <Container contain="normal" paddingY={7} flexDirection="row" justifyContent="space-between">
          <ConnectingShapes
            colorBorderShape="accent"
            colorShape="faint"
            colorText="accent"
            content={[
              <Heading semanticElement="h5" visualHeadingLevel="Heading 5">
                Total contracts
              </Heading>,
              "100",
            ]}
          />
          <ConnectingShapes
            colorBorderShape="dangerMid"
            colorShape="dangerMid"
            colorText="accent"
            content={[
              <Heading semanticElement="h5" visualHeadingLevel="Heading 5">
                Failed contracts
              </Heading>,
              "10",
            ]}
          />
          <ConnectingShapes
            colorBorderShape="complementary"
            colorShape="complementary"
            colorText="accent"
            content={[
              <Heading semanticElement="h5" visualHeadingLevel="Heading 5">
                Passed contracts
              </Heading>,
              "90",
            ]}
          />
        </Container>
      </View>
    </>
  )
}

Dashboard.suppressFirstRenderFlicker = true
Dashboard.authenticate = true
Dashboard.getLayout = (page) => <Layout title="Dashboard">{page}</Layout>

export default Dashboard
