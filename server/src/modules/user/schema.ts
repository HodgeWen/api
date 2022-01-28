import { Static, Type } from '@sinclair/typebox'

export const UserBody = Type.Object({
  account: Type.String(),
  password: Type.String({
    minLength: 6,
    maxLength: 18
  })
})

export type UserBodyType = Static<typeof UserBody>