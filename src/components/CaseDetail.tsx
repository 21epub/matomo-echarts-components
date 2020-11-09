import React from 'react'
import { Table, Card, Space, Spin } from 'antd'
import useSWR from 'swr'
import styles from './index.module.less'

type Options = {
  dateRange: string[]
  period: string
}

interface Props {
  url: string
  options: Options
  extra?: React.ReactNode[]
}

function CaseDetail({ url, options, extra }: Props) {
  const period = options.period
  const startDate = options.dateRange[0]
  const endDate = options.dateRange[1]

  let newUrl = ''

  if (startDate && endDate) {
    newUrl = `${url}?period=${period}&start_time=${startDate.replace(
      /\//g,
      '-'
    )}&end_time=${endDate.replace(/\//g, '-')}`
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
    const keylist = [
      'label',
      'nb_hits',
      'nb_uniq_visitors',
      'forwarding_number',
      'add_data'
    ]
    const titleList = ['作品', 'PV', 'UV', '分享转发', '数据记录']
    const columns = []
    const width = `${100 / titleList.length}%`
    for (let i = 0; i < titleList.length; i++) {
      columns[i] = {
        title: titleList[i],
        dataIndex: keylist[i],
        width: width
      }
    }

    const data = []
    for (let i = 0; i < elements.length; i++) {
      Object.defineProperty(elements[i], 'key', { value: i })
      Object.defineProperty(elements[i], 'label', {
        value: <a href={elements[i].url}>{elements[i].label}</a>
      })
      data[i] = elements[i]
    }

    return (
      <div className={styles.caseDetail}>
        <Card
          title='案例成效汇总'
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
  } else if (elements && elements.length === 0) {
    return (
      <div className={styles.noDataTrendDetail}>
        <Card
          title='案例成效汇总'
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

export default CaseDetail
