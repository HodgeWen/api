import { cacheKey, WebCache } from 'fe-dk'

export const local = WebCache.create('local')

export const session = WebCache.create('session')

export const TOKEN = cacheKey<string>('TOKEN')
