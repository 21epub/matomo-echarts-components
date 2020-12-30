import React from 'react'
import { Card, Pagination, Space, Spin } from 'antd'
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
  extra?: React.ReactNode[]
  pre?: string
}

function VisitorsList({ url, options, extra, pre }: Props) {
  const period = options.period
  const startDate = options.dateRange[0]
  const endDate = options.dateRange[1]

  let newUrl = ''
  if (period !== 'all' && startDate && endDate) {
    newUrl = `${url}?page=1&size=50&period=${period}&start_time=${startDate.replace(
      /\//g,
      '-'
    )}&end_time=${endDate.replace(/\//g, '-')}`
  }

  let daterangeContent = `${startDate}-${endDate}`
  if (period === 'all') {
    daterangeContent = ''
  }

  const swrOptions = {
    refreshInterval: 0
  }

  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data: elements } = useSWR(newUrl, fetcher, swrOptions)
  const ele = clone(elements)

  if (ele?.length) {
    // for (let i = 0; i < ele.length; i++) {
    //   Object.defineProperty(ele[i], 'label', {
    //     value: (
    //       <div>
    //         <img src={`${pre}${ele[i].logo}`} style={{ height: '15px' }} />
    //         {'  '}
    //         {ele[i].label}
    //       </div>
    //     )
    //   })
    // }
    console.log('ele', ele)

    return (
      <div className={styles.trendDetail}>
        <Card
          title='访客列表'
          extra={
            <Space size='large'>
              <p className='daterange'>{daterangeContent}</p>
              <div>{extra}</div>
            </Space>
          }
        >
          {/* <Table columns={columns} dataSource={data} /> */}
          <Pagination
            showSizeChanger
            pageSizeOptions={['10', '20', '30', '50']}
          />
        </Card>
      </div>
    )
  } else if (ele?.length === 0) {
    return (
      <div className={styles.noDataTrendDetail}>
        <Card
          title='访客列表'
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

export default VisitorsList
