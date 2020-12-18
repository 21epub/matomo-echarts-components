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
  createTime?: string
}

function Promote({
  url,
  options,
  detailLink = '#',
  cardTitle,
  isDetailVersion = false,
  createTime
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

  const bigVersion = styles.bigVersion
  const smallVersion = styles.smallVersion

  let daterangeContent = `${startDate}-${endDate}`
  if (period === 'all') {
    daterangeContent = ''
  }

  if (elements?.length && elements?.length !== 0) {
    // 饼图不知为什么显示的标题是反的，所以这样写
    elements = JSON.parse(
      JSON.stringify(elements).replace(/label/g, '访问数量')
    )

    const keylist = Object.keys(elements[0])
    const content = {
      tooltip: {},
      legend: {
        orient: 'vertical',
        x: 'right',
        icon: 'circle'
      },
      dataset: {
        dimensions: keylist,
        source: elements
      },
      xAxis: { type: 'category', show: false },
      yAxis: { type: 'value', show: false },
      series: [
        {
          type: 'pie',
          radius: ['50%', '80%'],
          itemStyle: {
            normal: {
              label: {
                show: true,
                formatter: '{b}: {@nb_visits}', // formatter: '{b}:{@nb_visits} {d}%',
                color: '#000'
              }
            }
          }
        }
      ],
      color: [
        'rgb(124,161,245)',
        'rgb(143,221,184)',
        'rgb(122,134,161)',
        'rgb(240,200,85)',
        'rgb(223,131,108)'
      ]
    }

    return (
      <div className={isDetailVersion ? bigVersion : smallVersion}>
        <Card
          title={cardTitle}
          extra={
            <Space size='large'>
              <p className='daterange'>{daterangeContent}</p>
              <a href={detailLink} className='detailLink'>
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

export default Promote
