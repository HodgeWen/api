import { RouteConfig } from 'vue-router'
import Vue, { AsyncComponent, ComponentOptions } from 'vue'

type ValueType =
  | 'object'
  | 'array'
  | 'string'
  | 'number'
  | 'blob'
  | 'date'
  | 'undefined'
  | 'function'
  | 'boolean'
  | 'file'
  | 'formdata'
  | 'symbol'
  | 'promise'

/**
 * 序列化一个对象至 'key=value&key1=value1' 的形式
 * @param obj 被序列化的对象
 */
export function serialize(obj: Record<string, any>): string {
  let ret = ''
  try {
    Object.keys(obj).forEach((key: string) => {
      // 如果值为undefined或者null则在字符串中的表现形式就是空串
      if ([undefined, null].includes(obj[key])) {
        ret += `${key}=&`
        return
      }
      ret += `${key}=${encodeURIComponent(obj[key])}&`
    })
    return ret.slice(0, -1)
  } catch {
    console.warn(`期望传入一个object格式数据, 此处传入了一个${getType(obj)}格式的数据`)
    return ''
  }
}

/**
 * 反序列化一个 'key=value&key1=value1' 形式的字符串
 * 需要用 decodeURIComponent 解码
 * 需要过滤所有的非正常字段
 * @param str 被序列化的对象
 */
export function unserialize<T extends Record<string, any>>(str: string): T {
  try {
    const body = str
      .replace(/^\?/, '')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
    return body ? JSON.parse('{"' + decodeURIComponent(body) + '"}') : {}
  } catch {
    console.warn('数据格式应满足 "key=value&key1=value1" 格式')
    return {} as T
  }
}

/**
 * 解析对象的值到number或string数据类型
 * @param o 对象
 * @param typeMap 对象类型映射
 */
export function parseQueryObject(
  o: Record<string, any>,
  typeMap: Record<string, 'string' | 'number'>
) {
  let map = {
    string: (val: any) => String(val),
    number: (val: any) => {
      let n = Number(val)
      return isNaN(n) ? val : n
    }
  }
  let ret: Record<string, any> = {}
  Object.keys(typeMap).forEach((key) => {
    if (o[key] === undefined) return
    ret = map[typeMap[key]](o[key])
  })
  return ret
}

/**
 * 循环一个数次并执行一些操作
 * @param num 要循环的数字
 * @param callback 循环处理的回调
 * @param didMap 是否映射, 如果映射该函数会返回一个每次回调的返回值的数组
 */
export function loop(num: number, callback: (num: number) => any, didMap = false) {
  let i = 0
  if (!didMap) {
    while (++i <= num) {
      callback(i)
    }
  } else {
    let ret = []
    while (++i <= num) {
      ret.push(callback(i))
    }
    return ret
  }
}

/**
 * 获取值得类型
 * @param val 任意值
 */
export function getType(val: any) {
  return Object.prototype.toString
    .call(val)
    .slice(8, -1)
    .toLowerCase() as ValueType
}

/**
 * 是否是未定义
 * @param value 值
 */
 export function isUndef(value: any): value is undefined {
  return getType(value) === 'undefined'
}

/**
 * 是否是表单数据
 * @param value 值
 */
export function isFormData(value: any): value is FormData {
  return getType(value) === 'formdata'
}

/**
 * 是否是对象
 * @param value 值
 */
export function isObj(value: any): value is Record<string, any> {
  return getType(value) === 'object'
}

/**
 * 返回任意值是否是某些情况中的一种
 * @param value 任意值
 * @param situations 类型的一些情形
 */
export function oneTypeOf(value: any, situations: ValueType[]): boolean {
  return situations.includes(getType(value))
}

/**
 * 返回数组中不是undefined类型的第一个值
 * @param args 任意数组值
 */
export function fallback<T>(...args: any[]) {
  return args.find((v) => v !== undefined) as T
}

/**
 * 拼接字符串
 * @param urls 字符串序列
 */
export function joinUrl(...urls: string[]) {
  const joinedUrl = urls
    .map((url) => url.replace(/\/*(.*)\/*$/, '$1'))
    .join('/')
    .replace(/\/+/g, '/')
  return joinedUrl.startsWith('/') ? joinedUrl : '/' + joinedUrl
}

/**
 * 排除一个对象的某些键和值
 * @param target 目标对象
 * @param omitKeys 排除的对象的键的数组
 */
export function omit<T extends Record<string, any>, K extends keyof T>(
  target: T,
  omitKeys: K[]
): Omit<T, K> {
  let ret = { ...target }
  omitKeys.forEach((key) => {
    delete ret[key]
  })
  return ret
}

/**
 * 从目标对象获取某些属性的值
 * @param target 目标对象
 * @param pickKeys 选择的对象的键的数组
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
  target: T,
  pickKeys: K[]
): Pick<T, K> {
  let ret = {} as T
  pickKeys.forEach((key) => (ret[key] = target[key]))
  return ret
}

/**
 * 返回一个值的空状态
 * @param val 任意值
 */
export function isEmpty(val: any) {
  const type = getType(val)

  switch (type) {
    case 'array':
      return val.length === 0
    case 'object':
      for (const key in val) {
        return false
      }
      return true
  }
  return !!val
}

/**
 * 获取链式值
 * @param o 目标对象
 * @param prop 属性
 * @param targetProp 目标属性
 */
export function getChainValue(o: any, prop: string, targetProp?: string) {
  let ret = o
  if (targetProp) {
    ret = o[targetProp]
  }

  prop &&
    prop.split('.').some((p) => {
      if (p === '$last' && Array.isArray(ret)) {
        ret = ret[ret.length - 1]
      } else {
        ret = ret[p]
      }

      if (!ret) {
        return true
      }
    })
  return ret
}

/**
 * 数组映射到对象
 * @param arr 数组
 * @param keyProp 对应对象键的属性
 * @param valueProp 对应对象值得属性
 */
export function atoo(
  arr: Record<string, any>[],
  keyProp = 'value',
  valueProp = 'text'
): Record<string | number, any> {
  let ret = Object.create(null)
  arr.forEach((item) => {
    ret[item[keyProp]] = item[valueProp]
  })
  return ret
}

/**
 * 获取数组最后一位
 * @param arr 数组
 */
export function last<T>(arr: T[]): T {
  return arr[arr.length - 1]
}

type Routes = RouteConfig | Array<RouteConfig>

/**
 * 路由嵌套
 * @param route 单个路由
 */
export function routeNest(route: RouteConfig, parent?: string): RouteConfig
/**
 * 路由嵌套
 * @param routes 多个路由
 */
export function routeNest(routes: Array<RouteConfig>, parent?: string): Array<RouteConfig>
export function routeNest(routes: Routes, parent?: string): Routes {
  // 多个路由
  if (Array.isArray(routes)) return routes.map((route) => routeNest(route, parent))

  // 单个路由
  if (parent) {
    routes.path = joinUrl(parent, routes.path)
    if (routes.meta?.parent) {
      routes.meta.parent = joinUrl(parent, routes.meta.parent)
    }
  }

  if (routes.children) {
    routeNest(routes.children, routes.path)
  }
  return routes
}

type MapperValue = {
  /** 路由标题 */
  title: string
  /** 路由名称 */
  name?: string
}
/**
 * 为同一个组件配置不同的路由
 * @param component 组件, 可以是异步组件可以是同步组件
 * @param routeMapper 路由配置映射, 不同的路由生成不同的 meta
 * @param commonMeta 通用路由元数据, 将会被合进生成的每个路由的meta中
 */
export function routerSeries(
  component: ComponentOptions<Vue> | typeof Vue | AsyncComponent,
  routeMapper: Record<string, MapperValue>,
  commonMeta?: Record<string, any>
): Array<RouteConfig> {
  return Object.keys(routeMapper).map((path) => {
    let val = routeMapper[path]
    let config: RouteConfig = {
      path,
      component,
      meta: {
        ...commonMeta,
        title: val.title
      }
    }

    if (val.name) {
      config.name = val.name
    }

    return config
  })
}

/**
 * 将一个具有自关联性质的数组转化为一颗树
 * @param arr 数组
 * @param uniqueKey 唯一标识字段
 * @param parentKey 父元素唯一标识字段
 */
export function arrToTree(
  arr: Record<string, any>[],
  uniqueKey = 'id',
  parentKey = 'pid',
  rootNodeFlag: any = null
) {
  let map: Record<string, any> = Object.create(null)
  let tree: Record<string, any>[] = []
  arr.forEach((item) => {
    map[item[uniqueKey]] = item
  })
  arr.forEach((item) => {
    let pid = item[parentKey]
    if (pid === rootNodeFlag) return tree.push(item)
    let parent = map[pid]
    if (parent.children) {
      parent.children.push(item)
    } else {
      parent.children = [item]
    }
  })
  return tree
}

/**
 * 分转化为元
 * @param value 数值
 */
export const fenToYuan = (value: number) => +(value / 100).toFixed(2)

/**
 * 元转化为分
 * @param value 数值
 */
export const yuanToFen = (value: number) => value * 100

/**
 * 异步的映射一个数组,其回调函数返回一个promise
 * @param arr 映射的数组
 * @param cb 异步回调操作
 */
export async function asyncMap<R = any, T = any>(
  arr: T[],
  cb: (item: T, index: number, abort: () => void) => Promise<R>
) {
  let ret: R[] = []
  let len = arr.length
  if (!len) return ret

  let toAbort = false
  const abort = () => {
    toAbort = true
  }

  let i = -1
  while (++i < len && !toAbort) {
    let item = arr[i]
    let mappedItem = await cb(item, i, abort)
    ret.push(mappedItem)
  }

  return ret
}

/**
 * 分支策略
 * @param key 分支名
 * @param branches 分支方法
 */
export function branch<K extends string>(key: K, branches: { [P in K]?: () => any }) {
  let handler = branches[key]

  if (handler) return handler()
}

/**
 * 异步分支策略
 * @param key 分支名
 * @param branches 分支方法
 */
export async function asyncBranch<K extends string, B>(
  key: K,
  branches: { [P in K]?: () => Promise<B> }
) {
  let handler = branches[key]
  if (handler) return handler()
}

/**
 * 交换数组的元素
 * @param arr 发生交换的数组
 * @param firstIndex 第一个元素位置
 * @param secondIndex 第二个元素位置
 */
export function exchange<A>(arr: A[], firstIndex: number, secondIndex: number) {
  if (firstIndex >= arr.length || secondIndex >= arr.length || firstIndex === secondIndex) {
    return
  }
  let tmp: any = arr[firstIndex]
  arr[firstIndex] = arr[secondIndex]
  arr[secondIndex] = tmp
  tmp = null
}

/**
 * 金钱格式化
 * @param num 数字
 * @param precision 精度
 */
export function moneyFormat(num: number, precision = 0) {
  let numStr = +(num || 0).toFixed(precision) + '',
    ret = ''
  let [intStr, decimalStr] = numStr.split('.')

  while (intStr.replace('-', '').length > 3) {
    ret = `,${intStr.slice(-3)}${ret}`
    intStr = intStr.slice(0, -3)
  }

  ret = intStr + ret

  if (decimalStr) {
    ret += `.${decimalStr}`
  }

  return ret
}

/**
 * 获取指定长度的随机字符串
 * @param length 指定的字符串长度
 */
export function getRandomString(length = 32) {
  function getChar(quantity: number, baseCount: number) {
    return Array(quantity)
      .fill(null)
      .map((_, i) => String.fromCharCode(i + baseCount))
  }

  let numbers = getChar(10, 48)
  let capitals = getChar(26, 65)
  let lowercase = getChar(26, 97)
  const chars = [...numbers, ...capitals, ...lowercase]

  let str = ''
  loop(length, () => (str += chars[Math.round(Math.random() * 61)]))

  return str
}

/**
 * 借用组件中的方法
 * 使用方法：
 * methods :{
 *  ...useComponentMethod('form', ['setValue', 'getValue'])
 * }
 *
 *  */
export const useComponentMethod = (componentRefName: string, methodNames: string[]) =>
  methodNames.reduce(
    (acc, cur) => ({
      ...acc,
      [cur](this: any, ...args: any[]) {
        return this.$refer(componentRefName)[cur](...args)
      }
    }),
    {}
  )

/**
 * 打开报表页
 * @param name 报表名称
 * @param params 参数
 */
export const openReportPage = (name: string, params?: Record<string, any>) => {
  let paramsStr = serialize(params || {})
  window.open(`/ureport/preview?_u=file:${name}.ureport.xml${paramsStr ? '&' + paramsStr : ''}`)
}

/** 缓存工厂 */
export const cacheFactory = <R = any>(callback: (...args: any) => R) => {
  let cache = new Map<any, any>()
  Object.getPrototypeOf(cacheFactory).__proto__ = {
    _cache: cache
  }

  return function cacheFactoryMain(this: any, ...args: any): R {
    const cacheName = JSON.stringify(args)
    const isSearch = cache.has(cacheName)

    if (isSearch) {
      return cache.get(cacheName)
    } else {
      const res = callback.apply(this, args)
      cache.set(cacheName, res)
      return res
    }
  }
}

// 格式化时间戳
export const timestampFormat = function(timestamp: number | Date, format: string) {
  timestamp = new Date(timestamp)
  const map = {
    'M+': timestamp.getMonth() + 1,
    'd+': timestamp.getDate(),
    'h+': timestamp.getHours(),
    'm+': timestamp.getMinutes(),
    's+': timestamp.getSeconds()
  }
  const fill = (time: number) => (time < 10 && `0${time}`) || String(time)

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (timestamp.getFullYear() + '').slice(4 - RegExp.$1.length))
  }

  type Key = keyof typeof map

  for (const reg in map) {
    const regexp = new RegExp(`(${reg})`)
    if (regexp.test(format)) {
      format = format.replace(RegExp.$1, fill(map[reg as Key]))
    }
  }
  return format
}

type DateDiffProp = number | Date | string
/** 计算时间差
 *
 *  如果你要 计算总的月份 比如 2022-02 2021-07
 *  const diff = computedTimeDiff('2000-07', '2022-02')
 *  const month = diff.yarn * 12 + diff.moth
 *  month = 264
 *
 *  format 格式化 传（空字符串 默认 yyyy-MM-dd hh:mm:ss）
 *  const diff = computedTimeDiff(
 *    '2000-07-23 14:09:05',
 *    '2022-02-30 21:18:58',
 *    '剩余yyyy年，MM个月，dd天，h小时，m分钟，s秒'
 *  )
 *  diff = 剩余21年，08个月，10天，07小时，09分钟，53秒
 */
export function calcTimeDiff(start: DateDiffProp, end: DateDiffProp, format: string): string
export function calcTimeDiff(
  start: DateDiffProp,
  end: DateDiffProp
): { year: number; month: number; date: number; hour: number; minute: number; second: number }
export function calcTimeDiff(start: DateDiffProp, end: DateDiffProp, format?: string) {
  const transToDate = (date: DateDiffProp) => (getType(date) === 'string' ? new Date(date) : date)

  try {
    // 转换成date类型
    start = transToDate(start)
    end = transToDate(end)
    if ([start, end].includes('Invalid Date')) {
      throw { msg: '传入的日期，或者相减后的日期,不是一个正确的日期', start, end }
    }
  } catch (error) {
    console.error(error)
  }

  end = end as Date
  start = start as Date

  const year = end.getFullYear() - start.getFullYear()
  // 月份从0开始 所以要加1
  const month = end.getMonth() - start.getMonth() + 1
  const date = end.getDate() - start.getDate()
  const hour = end.getHours() - start.getHours()
  const minute = end.getMinutes() - start.getMinutes()
  const second = end.getSeconds() - start.getSeconds()
  const time = new Date()

  time.setFullYear(year)
  time.setMonth(month)
  time.setDate(date)
  time.setHours(hour)
  time.setMinutes(minute)
  time.setSeconds(second)

  // 有 format
  if (getType(format) === 'string') {
    return format === ''
      ? timestampFormat(time, 'yyyy-MM-dd hh:mm:ss')
      : timestampFormat(time, format!)
  }

  return {
    year: time.getFullYear(),
    month: time.getMonth(),
    date: time.getDate(),
    hour: time.getHours(),
    minute: time.getMinutes(),
    second: time.getSeconds()
  }
}
