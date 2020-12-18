import React from 'react'
import useSWR from 'swr'
import { Card, Spin, Space } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import ReactEcharts from 'echarts-for-react'
import { dataFormat } from '../util/util'
import styles from './index.module.less'
require('echarts/map/js/china.js')

type Options = {
  dateRange: string[]
  period: string
  source?: string
}

interface Props {
  url: string
  options: Options
  detailLink?: string
  cardTitle: string
  isDetailVersion?: boolean
  isOrgVersion?: boolean
  createTime?: string
}

function EchartsMap({
  url,
  options,
  detailLink = '#',
  cardTitle,
  isDetailVersion = false,
  isOrgVersion = false,
  createTime
}: Props) {
  const bigVersion = styles.bigVersion
  const smallVersion = styles.smallVersion

  const startDate = options.dateRange[0]
  const endDate = options.dateRange[1]
  const period = options.period
  const source = options.source

  let newUrl = ''
  if (isOrgVersion === false) {
    if (period !== 'all' && startDate && endDate) {
      newUrl = `${url}?period=${period}&referrer_type=${source}&start_time=${startDate.replace(
        /\//g,
        '-'
      )}&end_time=${endDate.replace(/\//g, '-')}`
    } else if (createTime !== '') {
      newUrl = `${url}?period=${period}&referrer_type=${source}&start_time=${createTime}`
    }
  } else if (isOrgVersion === true) {
    if (period !== 'all' && startDate && endDate) {
      newUrl = `${url}?period=${period}&start_time=${startDate.replace(
        /\//g,
        '-'
      )}&end_time=${endDate.replace(/\//g, '-')}`
    }
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

  if (elements && elements.length !== 0 && elements.length !== undefined) {
    const data = dataFormat(elements)
    var content = {
      title: {
        text: '浏览量',
        x: 'left',
        y: 'bottom',
        textStyle: {
          fontWeight: 'normal'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: function (data: any) {
          if (data.data) {
            return `${data.name}<hr/>浏览量: ${data.value} <br/>占比: ${data.data.rate} `
          } else {
            return `${data.name}`
          }
        }
      },
      visualMap: {
        type: 'piecewise',
        splitNumber: 5,
        // seriesIndex:0,
        pieces: [
          // {gt: 10000, color: 'RGBA(125, 22, 24, 1.00)'},            // (1500, Infinity]
          { gt: 1000, lte: 10000, color: 'RGB(69, 132, 220)' },
          { gt: 100, lte: 1000, color: 'RGB(105, 157, 230)' },
          { gt: 10, lte: 100, color: 'RGB(162, 190, 234)' },
          { gt: 0, lte: 10, color: 'RGB(207, 223, 244)' },
          { value: 0, color: '#eef3fd' }
        ],
        realtime: false,
        calculable: false,
        // itemHeight: 50,
        hoverLink: false,
        orient: 'horizontal',
        label: { show: false },
        text: ['高', '低'],
        left: '10%'
      },
      series: [
        {
          name: '浏览量',
          type: 'map',
          map: 'china',
          aspectScale: 0.75, // 长宽比. default: 0.75
          zoom: 1.2,
          roam: false,
          // regions: [
          //     {
          //         name: "南海诸岛",
          //         itemStyle: {
          //         // 隐藏地图
          //             normal: {
          //                 opacity: 0, // 为 0 时不绘制该图形
          //             }
          //         },
          //         label: {
          //         show: false // 隐藏文字
          //         }
          //     }
          // ],
          itemStyle: {
            normal: {
              // label:{show:true},
              borderWidth: 1,
              borderColor: '#fff',
              areaColor: '#eef3fd'
            },
            emphasis: { label: { show: true } }
          },
          data: data
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

export default EchartsMap
