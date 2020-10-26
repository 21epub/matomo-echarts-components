import React from 'react'
import { Table, Card, Space, Spin } from 'antd'
import useSWR from 'swr'
import { compare } from './util'
import styles from './index.module.less'

// interface Props {
//   url: string
//   options?: any
//   keyState: string
//   createTime: string
//   extra?:any
// }
// { url, options, keyState, createTime,extra }: Props

interface Props {
  url: string
  keyState: string
  extra?: any
  defaultValue: string
}

function TransformDetail({ keyState, extra, url, defaultValue }: Props) {
  if (keyState === '') {
    keyState = defaultValue
  }

  const swrOptions = {
    refreshInterval: 0
  }
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data: elements } = useSWR(url, fetcher, swrOptions)

  if (elements && elements.length !== 0) {
    let keylist = Object.keys(elements)
    keylist = keylist.filter(
      (item) =>
        item !== 'total_conversion_rate' &&
        item !== 'total_visits_converted' &&
        item !== 'nb_uniq_visitors' &&
        item !== 'nb_visits'
    )

    const columns = []
    columns[0] = { title: '日期', dataIndex: 'date' }
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
              {/* <p className='daterange'>{daterangeContent}</p> */}
              {extra}
            </Space>
          }
        >
          <Table columns={columns} dataSource={data} />
        </Card>
      </div>
    )
  } else if (elements && elements.length === 0) {
    return (
      <div className={styles.noDataTrendDetail}>
        {/* <Card
          title='详细数据列表'
          extra={<p className='daterange'>{daterangeContent}</p>}
        >
          <h1>暂无数据</h1>
        </Card> */}
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

export default TransformDetail