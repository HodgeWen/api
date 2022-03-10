import { API_BASE } from '@/env'
import { Http } from 'fe-dk'
import { Notify } from 'quasar'

const http = new Http({
  baseUrl: API_BASE,
  withCredentials: true,
  timeout: 18000,

  before(conf) {
    return conf
  },
  after(res, reject) {
    if (res.code !== 200) {
      Notify.create({
        message: res.data
      })

      if (res.code >= 400) {
        reject()
      }
    }
    return res
  }
})

export default http
