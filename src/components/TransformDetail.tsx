import React from 'react'
import { Table, Card, Space, Spin } from 'antd'
import useSWR from 'swr'
import { compare } from '../util/util'
import styles from './index.module.less'

type Options = {
  dateRange: string[]
  period: string
  source?: string
}

interface Props {
  url: string
  keyState: string
  extra?: React.ReactNode[]
  defaultValue: string
  createTime: string
  options: Options
}

function TransformDetail({
  keyState,
  extra,
  url,
  defaultValue,
  createTime,
  options
}: Props) {
  if (keyState === '') {
    keyState = defaultValue
  }
  const period = options.period
  const startDate = options.dateRange[0]
  const endDate = options.dateRange[1]
  const source = options.source
  const select = keyState

  let daterangeContent = `${startDate}-${endDate}`
  if (period === 'all' || period === 'total') {
    daterangeContent = ''
  }

  let newUrl = ''
  if (period !== 'all' && startDate && endDate) {
    newUrl = `${url}?period=${period}&referrer_type=${source}&idgoal=${select}&start_time=${startDate.replace(
      /\//g,
      '-'
    )}&end_time=${endDate.replace(/\//g, '-')}`
  } else if (createTime !== '') {
    newUrl = `${url}?period=${period}&referrer_type=${source}&idgoal=${select}&start_time=${createTime.replace(
      /\//g,
      '-'
    )}`
  }

  const swrOptions = {
    refreshInterval: 0
  }
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data: elements } = useSWR(newUrl, fetcher, swrOptions)
  /* eslint-disable */
  if (
    elements?.total_conversion_rate ||
    elements?.total_conversion_rate === 0
  ) {
    /* eslint-enable */
    let keylist = Object.keys(elements)
    keylist = keylist.filter(
      (item) =>
        item !== 'total_conversion_rate' &&
        item !== 'total_visits_converted' &&
        item !== 'nb_uniq_visitors' &&
        item !== 'nb_visits'
    )

    let title
    if (period === 'today' || period === 'yesterday') {
      title = '时间'
    } else {
      title = '日期'
    }
    const columns = []
    columns[0] = { title: title, dataIndex: 'date' }
    columns[1] = { title: '转化次数', dataIndex: 'nb_visits_converted' }
    columns[2] = { title: '转化率', dataIndex: 'conversion_rate' }

    const data = []
    for (let i = 0; i < keylist.length; i++) {
      data[i] = {
        key: [i],
        date: keylist[i],
        nb_visits_converted: elements[keylist[i]].nb_visits_converted,
        conversion_rate: elements[keylist[i]].conversion_rate
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
    // } else if (!elements?.total_conversion_rate) {
    //   return (
    //     <div className={styles.noDataTrendDetail}>
    //       <Card
    //         title='详细数据列表'
    //         extra={<p className='daterange'>{daterangeContent}</p>}
    //       >
    //         <h1>暂无数据</h1>
    //       </Card>
    //     </div>
    //   )
  } else {
    return (
      <div>
        <Spin />
        loading...
      </div>
    )
  }
}

export default TransformDetail
