import moment from 'moment'

function getToday() {
  return moment(new Date())
}

function getThisYear() {
  return moment(new Date()).format('YYYY')
}

function getPastedDay(day: number) {
  return moment(new Date()).subtract(day, 'days')
}

function getPastedYear(year: number) {
  return moment(new Date()).subtract(year, 'years')
}

function getThisYearFirstDay() {
  return moment().year(moment().year()).startOf('year')
}

function getYearStartDay(year: any) {
  return moment(year).startOf('year').format('YYYY-MM-DD')
}

function getYearEndDay(year: any) {
  return moment(year).endOf('year').format('YYYY-MM-DD')
}

function getNextMonth(month: any) {
  return moment(month).add(1, 'months').startOf('month').format('YYYY-MM-DD')
}

function secondToTime(second: number) {
  return moment('2000-01-01 00:00:00').add(second, 'seconds').format('HH:mm:ss')
}

function checkPeriod(_startDate: string, _endDate: string) {
  const startDate = _startDate
  const endDate = _endDate
  const todayDate = getToday().format('YYYY/MM/DD')
  const yesterdayDate = getPastedDay(1).format('YYYY/MM/DD')
  const last7Date = getPastedDay(6).format('YYYY/MM/DD')
  const last15Date = getPastedDay(14).format('YYYY/MM/DD')
  const last30Date = getPastedDay(29).format('YYYY/MM/DD')
  const lastYear = getPastedYear(1).format('YYYY/MM/DD')

  if (startDate === endDate) {
    switch (startDate) {
      case todayDate: {
        return 'today'
      }
      case yesterdayDate: {
        return 'yesterday'
      }
      default:
        return 'range'
    }
  } else {
    switch (startDate) {
      case last7Date: {
        return 'last7'
      }
      case last15Date: {
        return 'last15'
      }
      case last30Date: {
        return 'last30'
      }
      case lastYear: {
        return 'last365'
      }
      default:
        return 'range'
    }
  }
}

function keyToRange(key: string) {
  const todayDate = getToday().format('YYYY/MM/DD')
  const yesterdayDate = getPastedDay(1).format('YYYY/MM/DD')
  const last7Date = getPastedDay(6).format('YYYY/MM/DD')
  const last15Date = getPastedDay(14).format('YYYY/MM/DD')
  const last30Date = getPastedDay(29).format('YYYY/MM/DD')
  const lastYear = getPastedYear(1).format('YYYY/MM/DD')
  const thisYearFirstDay = getThisYearFirstDay().format('YYYY/MM/DD')

  let newdate = []
  switch (key) {
    case 'today': {
      newdate = [todayDate, todayDate]
      return newdate
    }
    case 'yesterday': {
      newdate = [yesterdayDate, yesterdayDate]
      return newdate
    }
    case 'last7': {
      newdate = [last7Date, todayDate]
      return newdate
    }
    case 'last15': {
      newdate = [last15Date, todayDate]
      return newdate
    }
    case 'last30': {
      newdate = [last30Date, todayDate]
      return newdate
    }
    case 'last365': {
      newdate = [lastYear, todayDate]
      return newdate
    }
    case 'thisyear': {
      newdate = [thisYearFirstDay, todayDate]
      return newdate
    }
    case 'total': {
      newdate = ['2020/09/25', todayDate]
      return newdate
    }
    default:
      return ['undefined', 'undefined']
  }
}

function transformMonthStartTime(month: string) {
  const startTime = `${month}-01`
  return startTime
}

function transformMonthEndTime(month: string) {
  const endTime = getNextMonth(month)
  return endTime
}

function transformYearStartTime(year: any) {
  const startTime = getYearStartDay(year)
  return startTime
}

function transformYearEndTime(year: any) {
  let endTime

  if (year === getThisYear()) endTime = getToday().format('YYYY-MM-DD')
  else endTime = getYearEndDay(year)

  return endTime
}

export {
  getToday,
  checkPeriod,
  keyToRange,
  getThisYear,
  secondToTime,
  getThisYearFirstDay,
  transformMonthStartTime,
  transformMonthEndTime,
  transformYearStartTime,
  transformYearEndTime
}
