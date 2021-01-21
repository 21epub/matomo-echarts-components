import React from 'react'
import { Table, Card, Space, Spin } from 'antd'
import useSWR from 'swr'
import { titleTranslate, compare } from '../util/util'
import styles from './index.module.less'

type Options = {
  dateRange: string[]
  period: string
  source?: string
}

interface Props {
  url: string
  options: Options
  keyState: string
  createTime?: string
  extra?: React.ReactNode[]
  isOrgVersion?: boolean
}

function TrendDetail({
  url,
  options,
  keyState,
  createTime,
  extra,
  isOrgVersion = false
}: Props) {
  const period = options.period
  const startDate = options.dateRange[0]
  const endDate = options.dateRange[1]
  const source = options.source

  let daterangeContent = `${startDate}-${endDate}`
  if (period === 'all' || period === 'total') {
    daterangeContent = ''
  }

  let newUrl = ''
  if (isOrgVersion === false) {
    if (period !== 'all' && startDate && endDate) {
      newUrl = `${url}?period=${period}&referrer_type=${source}&start_time=${startDate.replace(
        /\//g,
        '-'
      )}&end_time=${endDate.replace(/\//g, '-')}`
    } else if (createTime !== '') {
      newUrl = `${url}?period=${period}&referrer_type=${source}&start_time=${createTime}`
    }
  } else if (isOrgVersion === true) {
    if (period !== 'all' && startDate && endDate) {
      newUrl = `${url}?period=${period}&start_time=${startDate.replace(
        /\//g,
        '-'
      )}&end_time=${endDate.replace(/\//g, '-')}`
    }
  }

  const swrOptions = {
    refreshInterval: 0
  }
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data: ele } = useSWR(newUrl, fetcher, swrOptions)

  if (ele && Object.keys(ele)?.length) {
    const { total, ...elements } = ele
    const keylist = Object.keys(elements)
    const titleTransformed = titleTranslate(keyState)
    const columns = []

    let title
    if (period === 'today' || period === 'yesterday') {
      title = '时间'
    } else {
      title = '日期'
    }

    columns[0] = { title: title, dataIndex: 'date' }
    columns[1] = { title: titleTransformed, dataIndex: keyState }

    const data = []
    for (let i = 0; i < keylist.length; i++) {
      data[i] = {
        key: [i],
        date: [keylist[i]],
        [keyState]: elements[keylist[i]][keyState]
      }
    }

    data.sort(compare('key'))

    return (
      <div className={styles.trendDetail}>
        <Card
          title='详细数据列表'
          extra={
            <Space size='large'>
              <p className='daterange'>{daterangeContent}</p>
              {extra}
            </Space>
          }
        >
          <Table columns={columns} dataSource={data} />
        </Card>
      </div>
    )
  } else if (ele && Object.keys(ele)?.length === 0) {
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

export default TrendDetail
