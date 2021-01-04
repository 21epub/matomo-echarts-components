import React from 'react'
import useSWR from 'swr'
import { Card, Spin, Space } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import ReactEcharts from 'echarts-for-react'
import styles from './index.module.less'
import { clone } from 'ramda'
import { compare } from '../util/util'

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
  createTime?: string
}

function Funnel({
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

  let newUrls = ''
  if (period !== 'all' && startDate && endDate) {
    newUrls = `${url}?period=${period}&start_time=${startDate.replace(
      /\//g,
      '-'
    )}&end_time=${endDate.replace(/\//g, '-')}`
  } else if (createTime !== '') {
    newUrls = `${url}?period=${period}&start_time=${createTime}`
  }

  const swrOptions = {
    refreshInterval: 0
  }
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data: element } = useSWR(newUrls, fetcher, swrOptions)
  let elements = clone(element)
  const bigVersion = styles.funnelBigVersion
  const smallVersion = styles.funnelSmallVersion

  let daterangeContent = `${startDate}-${endDate}`
  if (period === 'all') {
    daterangeContent = ''
  }

  if (elements?.length) {
    // 倒序
    for (let i = 0; i < elements.length; i++) {
      Object.defineProperty(elements[i], 'key', { value: i })
      elements[i].label = `页面${elements[i].label}`
    }

    elements.sort(compare('key'))

    elements = JSON.parse(JSON.stringify(elements).replace(/label/g, '页面'))
    elements = JSON.parse(
      JSON.stringify(elements).replace(/nb_events/g, '访客数')
    )
    const keylist = ['页面', '访客数']

    const content = {
      tooltip: {},
      dataset: {
        dimensions: keylist,
        source: elements
      },
      xAxis: { type: 'value', show: false },
      yAxis: {
        type: 'category',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          margin: 70,
          textStyle: {
            align: 'left'
          }
        }
      },
      grid: {
        top: '0%',
        left: '-20px',
        bottom: '0%',
        containLabel: true
      },
      series: [
        {
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#7CA1F5',
              label: {
                show: true,
                position: 'right',
                color: '#000000 '
              }
            }
          },
          barMaxWidth: 30
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
                <RightOutlined style={{ color: 'grey' }} />
              </a>
            </Space>
          }
        >
          <ReactEcharts option={content} />
        </Card>
      </div>
    )
  } else if (elements?.length === 0) {
    return (
      <div className={isDetailVersion ? bigVersion : smallVersion}>
        <Card
          title={cardTitle}
          extra={
            <Space size='large'>
              <p className='daterange'>{daterangeContent}</p>
              <a className='detailLink' href={detailLink}>
                <RightOutlined style={{ color: 'grey' }} />
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

export default Funnel
