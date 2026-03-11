export const normalizePrice = (value: string) => {
  const digits = value.replace(/\D/g, '')

  if (!digits) return ''

  const normalized = String(Number(digits))

  return normalized
}
