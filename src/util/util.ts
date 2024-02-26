function dataFormat(elements: Array<any>, mapDetail = false) {
  const dataList = []
  for (let i = 0; i < elements.length; i++) {
    const str: string = elements[i].label
    let area: string = str.split(' ')[0]
    switch (area) {
      case 'Anhui':
        area = '安徽' // 1
        break
      case 'Beijing':
        area = '北京' // 2
        break
      case 'Fujian':
        area = '福建' // 3
        break
      case 'Gansu':
        area = '甘肃' // 4
        break
      case 'Guangdong':
        area = '广东' // 5
        break
      case 'Guangxi':
        area = '广西' // 6
        break
      case 'Guizhou':
        area = '贵州' // 7
        break
      case 'Hainan':
        area = '海南' // 8
        break
      case 'Hebei':
        area = '河北' // 9
        break
      case 'Henan':
        area = '河南' // 10
        break
      case 'Heilongjiang':
        area = '黑龙江' // 11
        break
      case 'Hubei':
        area = '湖北' // 12
        break
      case 'Hunan':
        area = '湖南' // 13
        break
      case 'Jilin':
        area = '吉林' // 14
        break
      case 'Jiangsu':
        area = '江苏' // 15
        break
      case 'Jiangxi':
        area = '江西' // 16
        break
      case 'Liaoning':
        area = '辽宁' // 17
        break
      case 'Nei':
        area = '内蒙古' // 18
        break
      case 'Ningxia':
        area = '宁夏' // 19
        break
      case 'Qinghai':
        area = '青海' // 20
        break
      case 'Shandong':
        area = '山东' // 21
        break
      case 'Shanxi':
        area = '山西' // 22
        break
      case 'Shaanxi':
        area = '陕西' // 23
        break
      case 'Shanghai':
        area = '上海' // 24
        break
      case 'Sichuan':
        area = '四川' // 25
        break
      case 'Tianjin':
        area = '天津' // 26
        break
      case 'Tibet':
        area = '西藏' // 27
        break
      case 'Xinjiang':
        area = '新疆' // 28
        break
      case 'Yunnan':
        area = '云南' // 29
        break
      case 'Zhejiang':
        area = '浙江' // 30
        break
      case 'Chongqing':
        area = '重庆' // 31
        break
      case 'Macao':
        area = '澳门' // 32
        break
      case 'Hong':
        area = '香港' // 33
        break
      case 'Taiwan':
        area = '台湾' // 34
        break
      default:
        console.log(area)
        break
    }
    if (mapDetail === true) {
      dataList[i] = {
        label: area,
        nb_visits: elements[i].nb_visits,
        rate: `${elements[i].rate}`
      }
    } else {
      dataList[i] = {
        name: area,
        value: elements[i].nb_visits,
        rate: elements[i].rate
      }
    }
  }
  const data = dataList

  return data
}

function translatePlaceName(placeName: string) {
  const area: string = placeName.split(' ')[0]
  switch (area) {
    case 'Anhui':
      return '安徽' // 1
    case 'Beijing':
      return '北京' // 2
    case 'Fujian':
      return '福建' // 3
    case 'Gansu':
      return '甘肃' // 4
    case 'Guangdong':
      return '广东' // 5
    case 'Guangxi':
      return '广西' // 6
    case 'Guizhou':
      return '贵州' // 7
    case 'Hainan':
      return '海南' // 8
    case 'Hebei':
      return '河北' // 9
    case 'Henan':
      return '河南' // 10
    case 'Heilongjiang':
      return '黑龙江' // 11
    case 'Hubei':
      return '湖北' // 12
    case 'Hunan':
      return '湖南' // 13
    case 'Jilin':
      return '吉林' // 14
    case 'Jiangsu':
      return '江苏' // 15
    case 'Jiangxi':
      return '江西' // 16
    case 'Liaoning':
      return '辽宁' // 17
    case 'Inner':
      return '内蒙古' // 18
    case 'Ningxia':
      return '宁夏' // 19
    case 'Qinghai':
      return '青海' // 20
    case 'Shandong':
      return '山东' // 21
    case 'Shanxi':
      return '山西' // 22
    case 'Shaanxi':
      return '陕西' // 23
    case 'Shanghai':
      return '上海' // 24
    case 'Sichuan':
      return '四川' // 25
    case 'Tianjing':
      return '天津' // 26
    case 'Tibet':
      return '西藏' // 27
    case 'Xinjiang':
      return '新疆' // 28
    case 'Yunnan':
      return '云南' // 29
    case 'Zhejiang':
      return '浙江' // 30
    case 'Chongqing':
      return '重庆' // 31
    case 'Macao':
      return '澳门' // 32
    case 'Hong':
      return '香港' // 33
    case 'Taiwan':
      return '台湾' // 34
    default:
      return 'err'
  }
}

function titleTranslate(title: any, type = 'CBT') {
  switch (title) {
    case 'nb_hits':
      return 'PV'
    case 'nb_uniq_visitors':
      return 'UV'
    case 'forwarding_number':
      return '转发数'
    case 'avg_time_on_page':
      return '平均时长'
    case 'bounce_rate':
      return '跳出率'
    case 'add_data':
      return '数据记录'
    case 'maplabel':
      return '城市'
    case 'mapnb_visits':
      return '访问数量'
    case 'maprate':
      return '占比'
    case 'mapOrglabel':
      return '城市'
    case 'mapOrgnb_visits':
      return '访问数量'
    case 'mapOrgrate':
      return '占比'
    case 'barchartlabel':
      return '渠道名'
    case 'barchartnb_visits':
      return '访问数量'
    case 'promotelabel':
      return '渠道名'
    case 'promotenb_visits':
      return '访问数量'
    case 'byTimelabel':
      return '日期'
    case 'byTimevisits':
      return '登录人次'
    case 'byOrglabel':
      return '机构'
    case 'byOrgvisits':
      return '登录人次'
    case 'Adlabel':
      return '广告活动'
    case 'Adnb_visits':
      return '访客数'
    case 'brandlabel':
      return '品牌'
    case 'brandnb_visits':
      return '访客数'
    case 'systemlabel':
      return '操作系统版本'
    case 'systemnb_visits':
      return '访客数'
    case 'deviceTypelabel':
      return '类型'
    case 'deviceTypenb_visits':
      return '访客数'
    case 'funnellabel':
      return '页面'
    case 'funnelnb_events':
      return '访客数'
    case 'eventlabel':
      return '事件名称'
    case 'eventnb_events':
      return '触发数'
    case 'exposure':
      return '曝光量'
    case 'click':
      return '点击量'
    case 'cbt':
      if (type === 'CBT') return '课程单元'
      else return type
    case 'doc':
      return '文档'
    case 'docset':
      return '文档集'
    case 'quiz':
      return 'Quiz'
    case 'video':
      return '视频'
    case 'h5':
      return 'H5'
    default:
      return 'null'
  }
}

function compare(p: string) {
  return function (m: any, n: any) {
    var a = m[p]
    var b = n[p]
    return b - a
  }
}

export const getFormatedNumber = (data: number, type: string) => {
  switch (type) {
    case 'exposure':
      return Math.floor((data / 100000000) * 100) / 100
    case 'click':
      return Math.floor((data / 10000) * 100) / 100
    default:
      return data
  }
}

export function getUnit(keyState: string) {
  switch (keyState) {
    case 'exposure':
      return '亿人次'
    case 'click':
      return '万人次'
    default:
      return ''
  }
}

export function getTabSum(keyState: string, elements: Record<string, any>) {
  let sum = 0
  const valueList = Object.values(elements)

  valueList.forEach((obj: Record<string, number>) => {
    sum += obj[keyState]
  })

  return sum
}

export { dataFormat, titleTranslate, compare, translatePlaceName }
