import { AuthenticationError, Link, useMutation, Routes } from "blitz"
import { FORM_ERROR } from "app/core/components/Form"
import login from "app/auth/mutations/login"
import { Login } from "app/auth/validations"
import { View, Heading, Field, TextInput, Form, ButtonFilled } from "@go1d/go1d"
import { validateSchema } from "app/core/utils/validations"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <View backgroundColor="background" padding={5} borderRadius={3} width={350} boxShadow="distant">
      <Heading
        semanticElement="h4"
        visualHeadingLevel="Heading 4"
        textAlign="center"
        marginBottom={4}
      >
        Login
      </Heading>

      <Form
        validate={(values) => validateSchema(Login, values)}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, actions) => {
          try {
            await loginMutation(values)
            props.onSuccess?.()
          } catch (error) {
            actions.setSubmitting(false)
            if (error instanceof AuthenticationError) {
              actions.setErrors({ email: "Sorry, those credentials are invalid" })
            } else {
              actions.setErrors({
                password:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              })
            }
          }
        }}
      >
        <Field component={TextInput} name="email" label="Email" required />
        <Field component={TextInput} name="password" label="Password" type="password" required />
        <ButtonFilled type="submit" color="accent">
          Login
        </ButtonFilled>
        <div>
          <Link href={Routes.ForgotPasswordPage()}>
            <a>Forgot your password?</a>
          </Link>
        </div>
      </Form>

      <div style={{ marginTop: "1rem" }}>
        Or <Link href={Routes.SignupPage()}>Sign Up</Link>
      </div>
    </View>
  )
}

export default LoginForm
