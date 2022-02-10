import { createHmac } from 'crypto'
import { genSalt, hash } from 'bcrypt'

export const hmacSHA256 = <T extends Record<string, any> = Record<string, any>>(
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

/**
 * 密码加密
 * @param obj 对象
 * @param keys 对象要加密的键
 * @param saltRounds 加密轮数
 * @returns
 */
export const bcryptHash = async <T extends Record<string, any> = Record<string, any>>(
  obj: T,
  keys: (keyof T)[] | 'all',
  saltRounds = 10
) => {
  if (keys === 'all') {
    let ret: Record<string, string> = {}

    for (const key in obj) {
      let raw = obj[key]
      let salt = await genSalt(saltRounds)
      let v = await hash(raw, salt)
      ret[key] = v
    }

    return ret
  } else {
    let ret: Record<string, any> = {}
    let len = keys.length

    while (--len >= 0) {
      let key = keys[len] as string
      let raw = obj[key]
      let salt = await genSalt(saltRounds)
      let v = await hash(raw, salt)
      ret[key] = v
    }

    return { ...obj, ...ret }
  }
}
