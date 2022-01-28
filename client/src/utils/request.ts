import { API_BASE } from '@/env'
import Http from './http/http'
import { ElMessage } from 'element-plus'

const http = new Http({
  baseUrl: API_BASE,
  withCredentials: true,
  timeout: 18000,

  before(conf) {
    return conf
  },
  after(res, reject) {
    if (res.code !== 200) {
      ElMessage.error(res.message)

      if (res.code >= 400) {
        reject()
      }
    }
    return res
  }
})

export default http
