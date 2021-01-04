import React from 'react'
import { Table, Card, Space, Spin } from 'antd'
import { titleTranslate } from '../util/util'
import useSWR from 'swr'
import { clone } from 'ramda'
import styles from './index.module.less'

type Options = {
  dateRange: string[]
  period: string
}

interface Props {
  url: string
  options: Options
  detailType: string
  createTime?: string
  extra?: React.ReactNode[]
}

function FunnelDetail({ url, options, detailType, createTime, extra }: Props) {
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
  const { data: elements } = useSWR(newUrl, fetcher, swrOptions)
  const ele = clone(elements)
  let daterangeContent = `${startDate}-${endDate}`
  if (period === 'all') {
    daterangeContent = ''
  }

  if (ele?.length) {
    // const keylist = Object.keys(ele[0])
    const keylist = ['label', 'nb_events']

    const columns = []
    for (let i = 0; i < keylist.length; i++) {
      columns[i] = {
        title: titleTranslate(`${detailType}${keylist[i]}`),
        dataIndex: keylist[i],
        width: 50
      }
    }

    const data = []
    for (let i = 0; i < ele.length; i++) {
      Object.defineProperty(ele[i], 'key', { value: i })
      data[i] = ele[i]
      data[i].label = `页面${data[i].label}`
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
  } else if (ele?.length === 0) {
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

export default FunnelDetail
