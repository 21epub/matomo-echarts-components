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
  labelUrl?: string
  options: Options
  detailLink?: string
  cardTitle: string
  isDetailVersion?: boolean
  createTime?: string
  isOrg?: boolean
}

function CampaignChart({
  url,
  labelUrl,
  options,
  detailLink = '#',
  cardTitle,
  isDetailVersion = false,
  createTime,
  isOrg = false
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

  let res
  let labelList: any
  if (!isOrg && labelUrl) {
    res = useSWR(labelUrl, fetcher, swrOptions).data
    labelList = res?.data?.results
  }

  const bigVersion = styles.bigVersion
  const smallVersion = styles.smallVersion

  let daterangeContent = `${startDate}-${endDate}`
  if (period === 'all' || period === 'total') {
    daterangeContent = ''
  }

  // 机构数据暂时不开放
  if (isOrg) elements = []
  if (elements?.length && labelList?.length) {
    const getLabelName = (labelId: string) => {
      const labelItem = labelList.filter((item: any) => item.id === labelId)
      if (labelItem.length) return labelItem[0].name
      else return null
    }

    let data: any = []
    elements = elements.forEach((it: any) => {
      const labelId = String(it.label).endsWith('/')
        ? String(it.label).substr(0, String(it.label).length - 1)
        : String(it.label).substr(0, String(it.label).length)

      const labelName = getLabelName(labelId)
      if (labelName) {
        if (
          data.filter((labelItem: any) => labelItem.label === labelName)?.length
        ) {
          data.forEach((dataItem: any) => {
            if (dataItem.label === labelName) {
              dataItem.nb_visits = dataItem.nb_visits + it.nb_visits
            }
          })
        } else {
          data.push({ label: labelName, nb_visits: it.nb_visits })
        }
      }
    })

    if (data?.length) {
      // 倒序
      for (let i = 0; i < data.length; i++) {
        Object.defineProperty(data[i], 'key', { value: i })
      }
      data.sort(compare('key'))

      data = JSON.parse(JSON.stringify(data).replace(/label/g, '品牌'))
      data = JSON.parse(JSON.stringify(data).replace(/nb_visits/g, '访客数'))
      const keylist = Object.keys(data[0])

      const content = {
        tooltip: {},
        dataset: {
          dimensions: keylist,
          source: data
        },
        xAxis: {
          type: 'value',
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'category',
          axisTick: {
            show: false
          },
          axisLabel: {
            margin: 160,
            textStyle: {
              align: 'left'
            }
          }
        },
        grid: {
          top: '0%',
          left: '0px',
          right: '20px',
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
    } else {
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
    }
  } else if (elements?.length === 0 || labelList?.length === 0) {
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

export default CampaignChart
