import React from 'react'
import { Table, Card, Space, Spin } from 'antd'
import { titleTranslate } from '../util/util'
import useSWR from 'swr'
import styles from './index.module.less'

type Options = {
  dateRange: string[]
  period: string
  source?: string
}

interface Props {
  url: string
  labelUrl?: string
  options: Options
  detailType: string
  createTime?: string
  extra?: React.ReactNode[]
  isOrg?: boolean
}

function CampaignDetail({
  url,
  labelUrl,
  options,
  detailType,
  createTime,
  extra,
  isOrg = false
}: Props) {
  const period = options.period
  const startDate = options.dateRange[0]
  const endDate = options.dateRange[1]

  let newUrl = ''

  if (period !== 'all' && startDate && endDate) {
    newUrl = `${url}?period=${period}&start_time=${startDate.replace(
      /\//g,
      '-'
    )}&end_time=${endDate.replace(/\//g, '-')}`
  } else if (createTime !== '') {
    newUrl = `${url}?period=${period}&start_time=${createTime}`
  }

  const swrOptions = {
    refreshInterval: 0
  }
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  let { data: elements } = useSWR(newUrl, fetcher, swrOptions)

  let res
  let labelList: any
  if (!isOrg && labelUrl) {
    res = useSWR(labelUrl, fetcher, swrOptions).data
    labelList = res?.data?.results
  }

  let daterangeContent = `${startDate}-${endDate}`
  if (period === 'all' || period === 'total') {
    daterangeContent = ''
  }

  // 机构数据暂时不开放
  if (isOrg) elements = []
  if (elements?.length && labelList?.length) {
    const keylist = Object.keys(elements[0])
    const columns = []
    for (let i = 0; i < keylist.length; i++) {
      columns[i] = {
        title: titleTranslate(`${detailType}${keylist[i]}`),
        dataIndex: keylist[i]
      }
    }
    const getLabelName = (labelId: string) => {
      const labelItem = labelList.filter((item: any) => item.id === labelId)
      if (labelItem.length) return labelItem[0].name
      else return null
    }

    const data: any = []
    elements = elements.forEach((it: any) => {
      const labelId = String(it.label).endsWith('/')
        ? String(it.label).substr(0, String(it.label).length - 1)
        : String(it.label).substr(0, String(it.label).length)

      const labelName = getLabelName(labelId)
      if (labelName) {
        if (
          data.filter((labelItem: any) => labelItem.label === labelName)?.length
        ) {
          data.forEach((dataItem: any) => {
            if (dataItem.label === labelName) {
              dataItem.nb_visits = dataItem.nb_visits + it.nb_visits
            }
          })
        } else {
          data.push({ label: labelName, nb_visits: it.nb_visits })
        }
      }
    })

    if (data?.length) {
      for (let i = 0; i < data.length; i++) {
        Object.defineProperty(data[i], 'key', { value: i })
      }

      return (
        <div className={styles.trendDetail}>
          <Card
            title='详细数据列表'
            extra={
              <Space size='large'>
                <p className='daterange'>{daterangeContent}</p>
                <div>{extra}</div>
              </Space>
            }
          >
            <Table columns={columns} dataSource={data} />
          </Card>
        </div>
      )
    } else {
      return (
        <div className={styles.noDataTrendDetail}>
          <Card
            title='详细数据列表'
            extra={<p className='daterange'>{daterangeContent}</p>}
          >
            <h1>暂无数据</h1>
          </Card>
        </div>
      )
    }
  } else if (elements?.length === 0 || labelList?.length === 0) {
    return (
      <div className={styles.noDataTrendDetail}>
        <Card
          title='详细数据列表'
          extra={<p className='daterange'>{daterangeContent}</p>}
        >
          <h1>暂无数据</h1>
        </Card>
      </div>
    )
  } else {
    return (
      <div>
        <Spin />
        loading...
      </div>
    )
  }
}

export default CampaignDetail
