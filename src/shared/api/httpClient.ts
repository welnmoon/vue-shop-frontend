import { BACKEND_URL } from '../config/api'

export class HttpError extends Error {
  status: number
  bodyText?: string
  constructor(status: number, message: string, bodyText?: string) {
    super(message)
    this.status = status
    this.name = 'HTTP ERROR'
    this.bodyText = bodyText
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

  const text = await response.text()
  throw new HttpError(
    response.status,
    response.status === 401 ? 'Unauthorized' : 'Request failed',
    text,
  )
}
