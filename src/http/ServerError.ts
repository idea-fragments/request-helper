import { ServerErrorDetails } from "http/types"

const ERROR_TYPES = {
  SYSTEM:      "SYSTEM",
  UNKNOWN:     "UNKNOWN",
  USER_FACING: "USER_FACING",
  VALIDATION:  "VALIDATION",
} as const

export type ServerErrorType = typeof ERROR_TYPES[keyof typeof ERROR_TYPES]

export class ServerError extends Error {
  static ERROR_TYPES = ERROR_TYPES
  static isInstance  = (e: Error): boolean => {
    return e.hasOwnProperty("_isServerError")
  }

  data: { [key: string]: any } | undefined
  status: number
  type: string
  _isServerError = true

  constructor({ data, error, status, type }: ServerErrorDetails) {
    super(error)
    this.data   = data
    this.status = status
    this.type   = type.toUpperCase()
  }

  isValidationError  = (): boolean => this.type === ERROR_TYPES.VALIDATION
  isDisplayableError = (): boolean => this.type === ERROR_TYPES.USER_FACING
  isSystemError      = (): boolean => this.type === ERROR_TYPES.SYSTEM
}
