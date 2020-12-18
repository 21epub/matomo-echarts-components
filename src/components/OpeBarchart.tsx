import React from 'react'
import useSWR from 'swr'
import { Card, Spin } from 'antd'
import ReactEcharts from 'echarts-for-react'
// import OpeFilter from './OpeFilter'
// import styles from './index.module.less'

interface Options {
  dateRange: string[]
  period: string
  source?: string
  selection?: string
  org?: string
}

interface Props {
  url: string
  options: Options
}

function OpeBarchart({ url, options }: Props) {
  const selection = options.selection
  // const org = options.org

  const newUrl = `${url}?date=${selection}`

  const swrOptions = {
    refreshInterval: 0
  }

  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  let { data: elements } = useSWR(newUrl, fetcher, swrOptions)

  if (elements && elements.length !== 0 && elements.length !== undefined) {
    elements = JSON.parse(JSON.stringify(elements).replace(/label/g, '机构'))
    elements = JSON.parse(
      JSON.stringify(elements).replace(/visits/g, '登录人次')
    )
    // const keylist = Object.keys(elements[0])

    const content = {
      tooltip: {},
      dataset: {
        dimensions: ['机构', '登录人次'],
        source: elements
      },
      xAxis: { type: 'category' },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false }
      },
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
      <div>
        <Card>
          <ReactEcharts option={content} />
        </Card>
      </div>
    )
  } else if (elements && elements.length === 0) {
    return (
      <div>
        <Card>
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

export default OpeBarchart
