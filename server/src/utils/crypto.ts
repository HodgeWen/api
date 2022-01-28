import { createHmac } from 'crypto'

export const hmacSHA256 = <
  T extends Record<string, any> = Record<string, any>
>(
  object: T,
  keys: (keyof T)[] | 'all',
  secret: string
) => {
  const hmac = createHmac('sha256', secret)

  if (keys === 'all') {
    let ret: Record<string, string> = {}
    Object.keys(object).forEach(key => {
      ret[key] = hmac.update(object[key]).digest('hex')
    })
    return ret
  } else {
    let ret: Record<string, any> = {}
    keys.forEach(key => {
      ret[key as string] = hmac.update(object[key]).digest('hex')
    })
    return { ...object, ...ret }
  }
}
