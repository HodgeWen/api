import http from "@/utils/request"

/**
 * 登录
 * @param data 数据
 */
export const login = (data: any) => {
  return http.post('/user/login', data)
}
/**
 * 注册
 * @param data 数据
 */
export const register = (data: any) => {
  return http.post('/user/register', data)
}
/**
 * 登出
 * @param data 数据
 */
 export const logout = (data: any) => {
  return http.post('/user/logout', data)
}