import React, { useState } from 'react'
import useSWR from 'swr'
import { Spin, Tabs, Col, Row } from 'antd'
import { titleTranslate } from '../util/util'
import ReactEcharts from 'echarts-for-react'
import styles from './index.module.less'

const { TabPane } = Tabs

type Options = {
  dateRange: string[]
  period: string
}

interface Props {
  url: string
  options: Options
}

function HomePageTrend({ url, options }: Props) {
  const period = options.period
  const startDate = options.dateRange[0]
  const endDate = options.dateRange[1]

  const newUrl = `${url}?period=${period}&start_time=${startDate.replace(
    /\//g,
    '-'
  )}&end_time=${endDate.replace(/\//g, '-')}`

  const swrOptions = {
    refreshInterval: 0
  }
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data: ele } = useSWR(newUrl, fetcher, swrOptions)

  const [keyState, setKeyState] = useState('nb_hits')

  function getKey(key: string) {
    setKeyState(key)
  }

  let daterangeContent = `${startDate}-${endDate}`
  if (period === 'all' || period === 'total') {
    daterangeContent = ''
  }

  // <Col xs={{ span: 25 }}></Col>
  const tab = (
    <Tabs
      defaultActiveKey='nb_hits'
      activeKey={keyState}
      onChange={getKey}
      className='homePageTabs'
    >
      <TabPane tab='PV' key='nb_hits' />
      <TabPane tab='UV' key='nb_uniq_visitors' />
      <TabPane tab='分享转发' key='forwarding_number' />
      {/* <TabPane tab='数据' key='add_data' /> */}
    </Tabs>
  )

  if (ele?.total || ele?.total === 0) {
    const { total, ...elements } = ele
    const keylist = Object.keys(elements)
    const elementsValue = []
    for (let i = 0; i < keylist.length; i++) {
      if (keyState === 'bounce_rate') {
        let value = elements[keylist[i]][keyState]
        value = Number(value.substr(0, value.length - 1))
        const name = titleTranslate(keyState)
        elementsValue[i] = { date: keylist[i], [name]: value }
      } else {
        const name = titleTranslate(keyState)
        elementsValue[i] = {
          date: keylist[i],
          [name]: elements[keylist[i]][keyState]
        }
      }
    }
    const name = titleTranslate(keyState)
    const sourceValue = elementsValue
    const labelList = ['date', name]

    const content = {
      tooltip: {
        formatter: function (params: any) {
          const date = params.data.date
          const key = params.dimensionNames[1]
          const value = params.data[key]
          return key + '<br/>' + date + ':  ' + value
        }
      },
      dataset: {
        dimensions: labelList,
        source: sourceValue
      },
      xAxis: { type: 'category' },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false }
      },
      series: [
        {
          type: 'line',
          smooth: true,
          itemStyle: {
            normal: {
              color: '#7CA1F5',
              label: {
                show: true,
                position: 'top',
                color: '#000000 '
              }
            }
          }
        }
      ]
    }

    return (
      <div className={styles.homePageTrend}>
        <Row align='middle' style={{ height: '15px' }}>
          <Col span={2} offset={2}>
            <div className='homePageTrendTitle'>趋势图</div>
          </Col>
          <Col span={6}>
            <p className='daterange'>{daterangeContent}</p>
          </Col>
          <Col span={8} offset={6}>
            {tab}
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <ReactEcharts option={content} />
          </Col>
        </Row>
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

export default HomePageTrend
