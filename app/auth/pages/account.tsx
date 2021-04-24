import { BlitzPage } from "blitz"
import AuthLayout from "app/core/layouts/AuthLayout"
import { Container, View } from "@go1d/go1d"
import UserForm from "app/auth/components/UserForm"
import { Suspense } from "react"

const Account: BlitzPage = () => {
  return (
    <Container contain="wide" flexDirection="row" justifyContent="space-between">
      <View flexBasis={0.35}>
        <Suspense fallback="loading...">
          <UserForm />
        </Suspense>
      </View>
    </Container>
  )
}

Account.suppressFirstRenderFlicker = true
Account.authenticate = true
Account.getLayout = (page) => <AuthLayout title="account">{page}</AuthLayout>

export default Account
