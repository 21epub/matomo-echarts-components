import React, { useState } from 'react'
import { Spin, Col, Row, Tabs } from 'antd'
import { titleTranslate } from '../util/util'
import ReactEcharts from 'echarts-for-react'
import styles from './index.module.less'
const { TabPane } = Tabs
interface Props {
  elements: Record<string, any>
  daterangeContent: string
}

export default function StatisticReportTrend({
  elements: ele,
  daterangeContent
}: Props) {
  const [keyState, setKeyState] = useState('cbt')

  function getKey(key: string) {
    setKeyState(key)
  }

  const tab = (
    <Tabs
      defaultActiveKey='exposure'
      activeKey={keyState}
      onChange={getKey}
      className='homePageTabs'
    >
      <TabPane tab='CBT' key='cbt' />
      <TabPane tab='文档' key='doc' />
      <TabPane tab='文档集' key='docset' />
      <TabPane tab='Quiz' key='quiz' />
      <TabPane tab='视频' key='video' />
      <TabPane tab='H5' key='h5' />
    </Tabs>
  )

  if (ele) {
    const { total, ...elements } = ele
    const keylist = Object.keys(elements)
    const elementsValue = []
    for (let i = 0; i < keylist.length; i++) {
      const name = titleTranslate(keyState)
      elementsValue[i] = {
        date: keylist[i],

        [name]: elements[keylist[i]][keyState]
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
        <Row align='middle' style={{ height: '20px', marginTop: '-10px' }}>
          <Col span={2} offset={2} style={{ marginTop: '-13px' }}>
            <div className='homePageTrendTitle'>趋势图</div>
          </Col>
          <Col span={6} style={{ marginTop: '-13px' }}>
            <p className='daterange'>{daterangeContent}</p>
          </Col>
          <Col offset={2}>{tab}</Col>
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
