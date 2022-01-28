/**
 *  获取当前日期时间
 */
export function currentDate() {
  var date = new Date()
  var Y = date.getFullYear()
  var M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  var h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

  var current = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s
  return current
}

/**
 *  获取年月日
 */
export function getYMD() {
  var date = new Date()
  var Y = date.getFullYear()
  var M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  return Y + '-' + M + '-' + D
}

/**
 *
 * @returns 获取年月日，星期
 */
export function getYMDWeek() {
  var date = new Date()
  var dateWeek = ''
  var Y = date.getFullYear()
  var M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  dateWeek = Y + '-' + M + '-' + D
  switch (date.getDay()) {
    case 0:
      dateWeek += '  星期日'
      break
    case 1:
      dateWeek += '  星期一'
      break
    case 2:
      dateWeek += '  星期二'
      break
    case 3:
      dateWeek += '  星期三'
      break
    case 4:
      dateWeek += '  星期四'
      break
    case 5:
      dateWeek += '  星期五'
      break
    case 6:
      dateWeek += '  星期六'
      break
  }
  return dateWeek
}

/**
 *  获取年月
 */
export function getYM() {
  var date = new Date()
  var Y = date.getFullYear()
  var M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  return Y + '-' + M
}

/**
 * 获取当前年份
 */
export function getFullYear() {
  var date = new Date()
  var Y = date.getFullYear() as any
  return Y
}

/**
 * 获取天数差
 * @param start 开始日期(yyyy-MM-dd)
 * @param end 结束日期(yyyy-MM-dd)
 */
export function getTimeDaysDiff(start: string, end: string): number
export function getTimeDaysDiff(start: Date, end: Date): number
export function getTimeDaysDiff(start: string | Date, end: string | Date): number {
  let timestampDiff = start instanceof Date ? +end - +start : +new Date(end) - +new Date(start)
  if (isNaN(timestampDiff)) {
    console.error('传入的时间格式有误')
    return 0
  }
  return Math.abs(Math.ceil(timestampDiff / 86400000))
}

interface GetDate {
  /**
   * @param date 日期
   * @param format 格式化的字符串
   */
  (date?: Date | string | number, format?: string): string
  matcher: {
    yyyy: (date: Date) => string
    'M+': (date: Date, len: number) => string
    'd+': (date: Date, len: number) => string
    'h+': (date: Date, len: number) => string
    'H+': (date: Date, len: number) => string
    'm+': (date: Date, len: number) => string
    's+': (date: Date, len: number) => string
  }
}

/** 获取格式化的日期 */
export const getDate = <GetDate>function (date: Date | string | number, format = 'yyyy-MM-dd') {
  if (!getDate.matcher) {
    getDate.matcher = {
      yyyy: (date) => date.getFullYear() + '',
      'M+': (date, len) => {
        let month = `${date.getMonth() + 1}`
        return len === 1 ? month : `0${month}`.slice(-2)
      },
      'd+': (date, len) => {
        let day = date.getDate() + ''
        return len === 1 ? day : `0${day}`.slice(-2)
      },
      'h+': (date, len) => {
        let hour = date.getHours()
        let strHour = (hour > 12 ? hour - 12 : hour) + ''
        return len === 1 ? strHour : `0${strHour}`.slice(-2)
      },
      'H+': (date, len) => {
        let Hour = `${date.getHours()}`
        return len === 1 ? Hour : `0${Hour}`.slice(-2)
      },
      'm+': (date, len) => {
        let mih = `${date.getMinutes()}`
        return len === 1 ? mih : `0${mih}`.slice(-2)
      },
      's+': (date, len) => {
        let sec = `${date.getSeconds()}`
        return len === 1 ? sec : `0${sec}`.slice(-2)
      }
    }
  }
  const { matcher } = getDate

  let _date: Date
  if (typeof date === 'number') {
    _date = new Date(date)
  } else if (typeof date === 'string') {
    _date = new Date(date)
  } else if (date instanceof Date) {
    _date = date
  } else [(_date = new Date())]

  type Reg = keyof typeof matcher

  ~['yyyy', 'M+', 'd+', 'h+', 'H+', 'm+', 's+'].forEach((reg) => {
    format = format.replace(new RegExp(`(${reg})`), (str) => {
      return matcher[reg as Reg](_date, str.length)
    })
  })

  return format
}
