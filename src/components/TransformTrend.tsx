import React, { useState } from 'react'
import useSWR from 'swr'
import { Card, Row, Col, Select, Spin } from 'antd'
import ReactEcharts from 'echarts-for-react'
import TransformDetail from './TransformDetail'
import styles from './index.module.less'

type Options = {
  dateRange: string[]
  period: string
  source?: string
}

interface Props {
  optionsUrl: string
  summaryUrl: string
  createTime: string
  options: Options
  extra?: React.ReactNode[]
}

function TransformTrend({
  optionsUrl,
  summaryUrl,
  createTime,
  options,
  extra
}: Props) {
  let [keyState, setKeyState] = useState('')

  const handleChange = (value: string) => {
    setKeyState(value)
  }

  const swrOptions = {
    refreshInterval: 0
  }
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  let { data: selectOptions } = useSWR(optionsUrl, fetcher, swrOptions)

  const period = options.period
  const startDate = options.dateRange[0]
  const endDate = options.dateRange[1]
  const source = options.source
  const select = keyState

  let newUrl = ''
  if (period !== 'all' && startDate && endDate) {
    newUrl = `${summaryUrl}?period=${period}&referrer_type=${source}&idgoal=${select}&start_time=${startDate.replace(
      /\//g,
      '-'
    )}&end_time=${endDate.replace(/\//g, '-')}`
  } else if (createTime !== '') {
    newUrl = `${summaryUrl}?period=${period}&referrer_type=${source}&idgoal=${select}&start_time=${createTime.replace(
      /\//g,
      '-'
    )}`
  }

  const { data: elements } = useSWR(newUrl, fetcher, swrOptions)

  if (selectOptions) {
    selectOptions = JSON.parse(
      JSON.stringify(selectOptions).replace(/idgoal/g, 'value')
    )
    selectOptions = JSON.parse(
      JSON.stringify(selectOptions).replace(/name/g, 'label')
    )
    if (keyState === '') {
      keyState = selectOptions[0].idgoal
    }

    if (elements) {
      const cardConent = []
      const titleList = ['访问次数', '访客数（UV）', '转化次数', '转化率']
      const todayData = [
        elements.nb_visits,
        elements.nb_uniq_visitors,
        elements.total_visits_converted,
        elements.total_conversion_rate
      ]
      for (let i = 0; i < titleList.length; i++) {
        cardConent[i] = {
          titleList: titleList[i],
          dataList: todayData[i]
        }
      }

      const keylist = Object.keys(elements)
      const keyArr = keylist.filter(
        (item) =>
          item !== 'total_conversion_rate' &&
          item !== 'total_visits_converted' &&
          item !== 'nb_uniq_visitors' &&
          item !== 'nb_visits'
      )

      const nbVisitsList = []
      for (let i = 0; i < keyArr.length; i++) {
        nbVisitsList[i] = elements[keyArr[i]].nb_visits_converted
      }
      const nbVisitsMax = Math.max(...nbVisitsList)

      const conversionRateList = []
      for (let i = 0; i < keyArr.length; i++) {
        const value = elements[keyArr[i]].conversion_rate
        conversionRateList[i] = Number(value.substr(0, value.length - 1))
      }
      const conversionRateMax = Math.max(...conversionRateList)

      let elementsList = []
      for (let i = 0; i < keyArr.length; i++) {
        elementsList[i] = [keyArr[i], nbVisitsList[i], conversionRateList[i]]
      }

      const title = [['时间', '转化次数', '转化率']]
      elementsList = title.concat(elementsList)

      const content = {
        tooltip: {
          // formatter: function (params: any) {
          //   console.log(params)
          //   const date = params.data.date
          //   const key = params.dimensionNames[1]
          //   const value = params.data[key]
          //   return key + '<br/>' + date + ':  ' + value
          // }
        },
        legend: {
          bottom: 'bottom',
          icon: 'circle'
        },
        dataset: {
          source: elementsList
        },
        xAxis: { type: 'category' },
        yAxis: [
          {
            type: 'value',
            axisLine: { show: false },
            axisTick: { show: false },
            splitNumber: 5,
            max: nbVisitsMax,
            interval: nbVisitsMax / 5,
            axisLabel: {
              show: true,
              interval: 'auto',
              // formatter: '{value}%'
              formatter: function (value: Number) {
                return value.toFixed(1)
              }
            }
          },
          {
            type: 'value',
            axisLine: { show: false },
            axisTick: { show: false },
            splitNumber: 5,
            max: conversionRateMax,
            interval: conversionRateMax / 5,
            axisLabel: {
              show: true,
              interval: 'auto',
              // formatter: '{value}%'
              formatter: function (value: Number) {
                return value.toFixed(1) + '%'
              }
            }
          }
        ],
        series: [
          {
            name: '转化次数',
            type: 'line',
            symbol: 'circle',
            symbolSize: 5,
            itemStyle: {
              normal: {
                color: '#63ade4'
              }
            }
          },
          {
            name: '转化率',
            type: 'line',
            yAxisIndex: 1,
            symbol: 'circle',
            symbolSize: 5,
            itemStyle: {
              normal: {
                color: '#8bcb56'
              }
            }
          }
        ]
      }

      return (
        <div className={styles.transformTrend}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <div className='trendCard'>
                <Card
                  title='转化目标'
                  extra={
                    <div className='transformSelecter'>
                      <Select
                        defaultValue={selectOptions[0].value}
                        value={keyState}
                        style={{ width: 250 }}
                        options={selectOptions}
                        onChange={handleChange}
                      />
                    </div>
                  }
                >
                  <Card.Grid style={{ width: '100%' }} hoverable={false}>
                    <Row>
                      {cardConent.map((e, i) => {
                        return (
                          <Col span={4} offset={2} key={i}>
                            <p>{e.titleList}</p>
                            <h1>{e.dataList}</h1>
                          </Col>
                        )
                      })}
                    </Row>
                  </Card.Grid>
                  <Card.Grid style={{ width: '100%' }} hoverable={false}>
                    <Row>
                      <Col span={24}>
                        <ReactEcharts option={content} />
                      </Col>
                    </Row>
                  </Card.Grid>
                </Card>
              </div>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <TransformDetail
                url={summaryUrl}
                keyState={keyState}
                extra={extra}
                defaultValue={selectOptions[0].value}
                createTime={createTime}
                options={options}
              />
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
  } else {
    return (
      <div>
        <Spin />
        loading...
      </div>
    )
  }
}

export default TransformTrend
