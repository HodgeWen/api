import Cache from 'ts-web-cache'

export const local = Cache.create('local')

export const session = Cache.create('session')

export const TOKEN = 'TOKEN'