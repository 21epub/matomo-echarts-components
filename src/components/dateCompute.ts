import moment from 'moment'

function getToday() {
  return moment(new Date())
}

function getPastedDay(day: number) {
  return moment(new Date()).subtract(day, 'days')
}

function checkPeriod(_startDate: string, _endDate: string) {
  const startDate = _startDate
  const endDate = _endDate
  const todayDate = getToday().format('YYYY/MM/DD')
  const yesterdayDate = getPastedDay(1).format('YYYY/MM/DD')
  const last7Date = getPastedDay(6).format('YYYY/MM/DD')
  const last15Date = getPastedDay(14).format('YYYY/MM/DD')
  const last30Date = getPastedDay(29).format('YYYY/MM/DD')

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
    default:
      return 'err'
  }
}

export { getToday, checkPeriod, keyToRange }
