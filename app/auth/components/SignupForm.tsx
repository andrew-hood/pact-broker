import { useMutation } from "blitz"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import { ButtonFilled, Field, Form, Heading, TextInput, View } from "@go1d/go1d"
import { validateSchema } from "app/core/utils/validations"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <View
      backgroundColor="background"
      paddingY={6}
      paddingX={5}
      borderRadius={3}
      width={480}
      boxShadow="distant"
    >
      <Heading
        semanticElement="h4"
        visualHeadingLevel="Heading 4"
        textAlign="center"
        marginBottom={8}
      >
        Create an account
      </Heading>

      <Form
        validate={(values) => validateSchema(Signup, values)}
        initialValues={{ firstname: "", lastname: "", email: "", password: "" }}
        onSubmit={async (values, actions) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error) {
            actions.setSubmitting(false)
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              actions.setErrors({ email: "This email is already being used" })
            } else {
              actions.setErrors({ email: error.toString() })
            }
          }
        }}
      >
        <View flexDirection="row" justifyContent="space-between">
          <Field component={TextInput} name="firstname" label="First Name" required />
          <Field component={TextInput} name="lastname" label="Last Name" required />
        </View>
        <Field component={TextInput} name="email" label="Email" required />
        <Field component={TextInput} name="password" label="Password" type="password" required />
        <ButtonFilled type="submit" color="accent">
          Sign up
        </ButtonFilled>
      </Form>
    </View>
  )
}

export default SignupForm
