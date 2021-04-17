import { useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import { View } from "@go1d/go1d"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <View height="100%" alignItems="center" justifyContent="center">
      <SignupForm onSuccess={() => router.push(Routes.Home())} />
    </View>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
