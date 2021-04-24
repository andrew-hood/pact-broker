import { BlitzPage } from "blitz"
import AuthLayout from "app/core/layouts/AuthLayout"
import { Container, foundations, Heading, SpotIcon, View } from "@go1d/go1d"

const Dashboard: BlitzPage = () => {
  const pactipants = [1, 2, 3, 4, 5, 6, 7, 8]
  return (
    <Container contain="wide" flexDirection="row" justifyContent="space-between">
      <View flexBasis={0.35} flexDirection="row" flexWrap="wrap" justifyContent="space-between">
        {pactipants.map((pactipant) => (
          <View
            width={200}
            height={200}
            boxShadow="crisp"
            borderRadius={3}
            marginBottom={5}
            padding={5}
            justifyContent="space-between"
            css={{
              ":hover": {
                boxShadow: foundations.shadows.strong,
                transition: "boxShadow linear 0.5s",
              },
            }}
          >
            <SpotIcon name="PersonalDevelopment" size={6} />
            <Heading visualHeadingLevel="Heading 5">Distribution Partner Service</Heading>
          </View>
        ))}
      </View>
      <View flexBasis={0.6}>
        <View
          width="100%"
          height={230}
          boxShadow="crisp"
          borderRadius={3}
          marginBottom={5}
          backgroundColor="success"
        />
        <View
          width="100%"
          height={360}
          boxShadow="crisp"
          borderRadius={3}
          marginBottom={5}
          backgroundColor="soft"
        />
      </View>
    </Container>
  )
}

Dashboard.suppressFirstRenderFlicker = true
Dashboard.authenticate = true
Dashboard.getLayout = (page) => <AuthLayout title="Dashboard">{page}</AuthLayout>

export default Dashboard
