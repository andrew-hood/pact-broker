import { useMutation } from "blitz"
import updateUser from "app/auth/mutations/updateUser"
import { UpdateUser } from "app/auth/validations"
import { ButtonFilled, Field, Form, TextInput, View } from "@go1d/go1d"
import { validateSchema } from "app/core/utils/validations"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

type UserFormProps = {
  onSuccess?: () => void
}

export const UserForm = (props: UserFormProps) => {
  const currentUser = useCurrentUser()
  const [updateUserMutation] = useMutation(updateUser)

  if (currentUser) {
    const [firstname, lastname] = currentUser.name?.split(" ") || ["", ""]
    return (
      <Form
        validate={(values) => validateSchema(UpdateUser, values)}
        initialValues={{ id: currentUser.id, firstname, lastname }}
        onSubmit={async (values, actions) => {
          try {
            await updateUserMutation(values)
            props.onSuccess?.()
          } catch (error) {
            //
          } finally {
            actions.setSubmitting(false)
          }
        }}
      >
        <Field component={TextInput} name="firstname" label="First Name" required />
        <Field component={TextInput} name="lastname" label="Last Name" required />
        <ButtonFilled type="submit" color="accent">
          Update
        </ButtonFilled>
      </Form>
    )
  }
  return null
}

export default UserForm
