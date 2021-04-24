import { BlitzPage, useMutation } from "blitz"
import Layout from "app/core/layouts/Layout"
import { FORM_ERROR } from "app/core/components/Form"
import { ForgotPassword } from "app/auth/validations"
import forgotPassword from "app/auth/mutations/forgotPassword"
import { ButtonFilled, Field, Form, Heading, Text, TextInput, View } from "@go1d/go1d"

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  return (
    <View height="100%" alignItems="center" justifyContent="center" backgroundColor="soft">
      <View
        backgroundColor="background"
        padding={5}
        borderRadius={3}
        width={350}
        boxShadow="distant"
      >
        {isSuccess ? (
          <>
            <Heading
              semanticElement="h4"
              visualHeadingLevel="Heading 4"
              textAlign="center"
              marginBottom={4}
            >
              Request Submitted
            </Heading>
            <Text>
              If your email is in our system, you will receive instructions to reset your password
              shortly.
            </Text>
          </>
        ) : (
          <>
            <Heading
              semanticElement="h4"
              visualHeadingLevel="Heading 4"
              textAlign="center"
              marginBottom={4}
            >
              Forgot your password?
            </Heading>
            <Form
              //schema={ForgotPassword}
              initialValues={{ email: "" }}
              onSubmit={async (values, actions) => {
                try {
                  await forgotPasswordMutation(values)
                } catch (error) {
                  actions.setErrors({
                    email: "Sorry, we had an unexpected error. Please try again.",
                  })
                  actions.setSubmitting(false)
                }
              }}
            >
              <Field component={TextInput} name="email" label="Email" required />
              <ButtonFilled type="submit" color="accent">
                Send Reset Password Instructions
              </ButtonFilled>
            </Form>
          </>
        )}
      </View>
    </View>
  )
}

ForgotPasswordPage.redirectAuthenticatedTo = "/"
ForgotPasswordPage.getLayout = (page) => <Layout title="Forgot Your Password?">{page}</Layout>

export default ForgotPasswordPage
