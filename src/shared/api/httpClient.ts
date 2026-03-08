import { BACKEND_URL } from '../config/api'

export class HttpError extends Error {
  status: number
  bodyText?: string
  data?: ErrorResponse | unknown

  constructor(status: number, message: string, bodyText?: string, data?: ErrorResponse | unknown) {
    super(message)
    this.status = status
    this.name = 'HTTP ERROR'
    this.bodyText = bodyText
    this.data = data
  }
}

type ErrorResponse = {
  message?: string | string[]
  error?: string
  statusCode?: number
}

const extractErrorMessage = (
  bodyText: string,
): { message: string; data?: ErrorResponse | unknown } => {
  if (!bodyText) {
    return { message: 'Что-то пошло не так' }
  }

  try {
    const data = JSON.parse(bodyText) as ErrorResponse

    if (Array.isArray(data.message)) {
      return {
        message: data.message.join(', '),
        data,
      }
    }

    if (typeof data.message === 'string' && data.message.trim()) {
      return {
        message: data.message,
        data,
      }
    }

    if (typeof data.error === 'string' && data.error.trim()) {
      return {
        message: data.error,
        data,
      }
    }

    return {
      message: 'Что-то пошло не так',
      data,
    }
  } catch {
    return {
      message: bodyText.trim() || 'Что-то пошло не так',
    }
  }
}

export const httpClient = async <T>(url: string, options: RequestInit): Promise<T> => {
  const fullUrl = `${BACKEND_URL}/${url}`

  const response = await fetch(fullUrl, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
    credentials: options.credentials ?? 'include',
  })

  if (response.status === 204) return undefined as T

  if (response.ok) {
    return response.json() as Promise<T>
  }

  const bodyText = await response.text()
  const { message, data } = extractErrorMessage(bodyText)

  throw new HttpError(response.status, message, bodyText, data)
}
