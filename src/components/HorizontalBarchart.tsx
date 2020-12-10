import React from 'react'
import useSWR from 'swr'
import { Card, Spin, Space } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import ReactEcharts from 'echarts-for-react'
import styles from './index.module.less'
import { clone } from 'ramda'
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
  isPicVersion?: boolean
  pre?: string
}

function HorizontalBarchart({
  url,
  options,
  detailLink = '#',
  cardTitle,
  isDetailVersion = false,
  createTime,
  isPicVersion = false,
  pre
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
  const bigVersion = styles.bigVersion
  const smallVersion = styles.smallVersion

  let daterangeContent = `${startDate}-${endDate}`
  if (period === 'all') {
    daterangeContent = ''
  }

  if (elements && elements.length !== 0) {
    let content
    if (isPicVersion === true) {
      // 如果修改坐标轴data,data的值必须保证和label的值一致，不能使用中文、uuid，格式会有问题
      const labels = elements.map((v: { label: string }) => v.label)

      const labelMap = new Map<string, string>()
      for (let i = 0; i < labels.length; i += 1) {
        const id = `id${i}`
        labelMap.set(id, labels[i])
        elements[i] = {
          label: id,
          nb_visits: elements[i].nb_visits,
          logo: `${pre}${elements[i].logo}`
        }
      }

      const labelList = Array.from(labelMap.keys())

      elements = JSON.parse(JSON.stringify(elements).replace(/label/g, '品牌'))
      elements = JSON.parse(
        JSON.stringify(elements).replace(/nb_visits/g, '访客数')
      )
      const keylist = Object.keys(elements[0])

      const labelRich = { value: { fontsize: 20 } }
      for (let i = 0; i < labelList.length; i += 1) {
        labelRich[labelList[i]] = {
          backgroundColor: { image: elements[i].logo },
          height: 15
        }
      }

      content = {
        tooltip: {
          formatter: function (data: any) {
            const label = labelMap.get(data.data.品牌)
            if (data.data) {
              return `访问量:<br/> ${label}: ${data.data.访客数} `
            } else {
              return `访问量:暂无`
            }
          }
        },
        dataset: {
          dimensions: keylist,
          source: elements
        },
        xAxis: { type: 'value' },
        yAxis: {
          type: 'category',
          data: labelList,
          axisLabel: {
            margin: 200,
            textStyle: {
              align: 'left'
            },
            formatter: function (value: string) {
              // value默认为label的值，如果yAxis定义了data，则为data中的值
              const label = labelMap.get(value)
              console.log(value, label, labelRich, labelMap)
              return `{${value}|} {value|${label}}`
            },
            rich: labelRich
          }
        },
        grid: {
          top: '0%',
          left: '0px',
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
    } else {
      elements = JSON.parse(JSON.stringify(elements).replace(/label/g, '品牌'))
      elements = JSON.parse(
        JSON.stringify(elements).replace(/nb_visits/g, '访客数')
      )
      const keylist = Object.keys(elements[0])

      content = {
        tooltip: {},
        dataset: {
          dimensions: keylist,
          source: elements
        },
        xAxis: { type: 'value' },
        yAxis: {
          type: 'category',
          axisLabel: {
            margin: 110,
            textStyle: {
              align: 'left'
            }
          }
        },
        grid: {
          top: '0%',
          left: '-60px',
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
  } else if (elements && elements.length === 0) {
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

export default HorizontalBarchart
