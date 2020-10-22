import React from 'react'
import useSWR from 'swr'
import { Card, Spin, Space } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import ReactEcharts from 'echarts-for-react'
import styles from './index.module.less'

type Options = {
  dateRange: string[]
  period: string
}

interface Props {
  url: string
  options: Options
  detailLink?: string
  cardTitle: string
  isDetailVersion?: boolean
  createTime: string
}

function Barchart({
  url,
  options,
  detailLink = '#',
  cardTitle,
  isDetailVersion = false,
  createTime
}: Props) {
  const startDate = options.dateRange[0]
  const endDate = options.dateRange[1]
  const period = options.period

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
  let { data: elements } = useSWR(newUrl, fetcher, swrOptions)

  const bigVersion = styles.bigVersion
  const smallVersion = styles.smallVersion

  let daterangeContent = `${startDate}-${endDate}`
  if (period === 'all') {
    daterangeContent = ''
  }

  if (elements && elements.length !== 0) {
    elements = JSON.parse(JSON.stringify(elements).replace(/label/g, '渠道名'))
    elements = JSON.parse(
      JSON.stringify(elements).replace(/nb_visits/g, '访问数量')
    )
    const keylist = Object.keys(elements[0])

    const content = {
      tooltip: {},
      dataset: {
        dimensions: keylist,
        source: elements
      },
      xAxis: { type: 'category' },
      yAxis: { type: 'value' },
      series: [
        {
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#7CA1F5',
              label: {
                show: true,
                position: 'top',
                color: '#000000 '
              }
            }
          },
          barWidth: 30
        }
      ]
    }

    return (
      <div className={isDetailVersion ? bigVersion : smallVersion}>
        <Card
          title={cardTitle}
          extra={
            <Space size='large'>
              <p className='daterange'>{daterangeContent}</p>
              <a className='detailLink' href={detailLink}>
                <RightOutlined />
              </a>
            </Space>
          }
        >
          <ReactEcharts option={content} />
        </Card>
      </div>
    )
  } else if (elements && elements.length === 0) {
    return (
      <div className={isDetailVersion ? bigVersion : smallVersion}>
        <Card
          title={cardTitle}
          extra={
            <Space size='large'>
              <p className='daterange'>{daterangeContent}</p>
              <a className='detailLink' href={detailLink}>
                <RightOutlined />
              </a>
            </Space>
          }
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

export default Barchart
