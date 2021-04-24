export const validateSchema = (schema: any, values: object) => {
  const parse = schema.safeParse(values)
  if (!parse.success && parse.error) {
    const errors = parse.error.flatten()
    return errors.fieldErrors
  }
}
