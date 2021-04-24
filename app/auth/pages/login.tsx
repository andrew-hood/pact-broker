import { useRouter, BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import { View } from "@go1d/go1d"

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <View height="100%" alignItems="center" justifyContent="center" backgroundColor="soft">
      <LoginForm
        onSuccess={() => {
          const next = router.query.next ? decodeURIComponent(router.query.next as string) : "/"
          router.push(next)
        }}
      />
    </View>
  )
}

LoginPage.redirectAuthenticatedTo = "/"
LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
