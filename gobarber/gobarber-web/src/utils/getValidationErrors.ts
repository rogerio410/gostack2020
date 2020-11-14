import { ValidationError } from 'yup'

interface ErrorMessages {
  [key: string]: string
}

export default function getValidationErrors(
  err: ValidationError
): ErrorMessages {
  const errorMessages: ErrorMessages = {}

  err.inner.forEach(error => {
    errorMessages[error.path] = error.message
  })

  return errorMessages
}
