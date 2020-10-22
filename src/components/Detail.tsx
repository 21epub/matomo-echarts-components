import React from 'react'
import { Table, Card, Button, Space, Spin } from 'antd'
import { titleTranslate, dataFormat } from './util'
import useSWR from 'swr'
import { DownloadOutlined } from '@ant-design/icons'
import styles from './index.module.less'

type Options = {
  dateRange: string[]
  period: string
}

interface Props {
  url: string
  options: Options
  detailType: string
  createTime: string
}

function Detail({ url, options, detailType, createTime }: Props) {
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
    newUrl = `${url}?period=${period}&start_time=${createTime.replace(
      /\//g,
      '-'
    )}`
  }

  const swrOptions = {
    refreshInterval: 0
  }
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data: elements } = useSWR(newUrl, fetcher, swrOptions)

  let daterangeContent = `${startDate}-${endDate}`
  if (period === 'all') {
    daterangeContent = ''
  }

  if (elements && elements.length !== 0) {
    const keylist = Object.keys(elements[0])
    const columns = []
    for (let i = 0; i < keylist.length; i++) {
      columns[i] = {
        title: titleTranslate(`${detailType}${keylist[i]}`),
        dataIndex: keylist[i]
      }
    }
    const data = []
    if (detailType !== 'map') {
      for (let i = 0; i < elements.length; i++) {
        Object.defineProperty(elements[i], 'key', { value: i })
        data[i] = elements[i]
      }
    } else {
      const mapDetail = true
      const dataList = dataFormat(elements, mapDetail)
      for (let i = 0; i < elements.length; i++) {
        Object.defineProperty(dataList[i], 'key', { value: i })
        data[i] = dataList[i]
      }
    }

    return (
      <div className={styles.trendDetail}>
        <Card
          title='详细数据列表'
          extra={
            <Space size='large'>
              <p className='daterange'>{daterangeContent}</p>
              <Button icon={<DownloadOutlined />}>下载数据</Button>
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

export default Detail
