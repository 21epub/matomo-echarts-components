import React from 'react'
import { Table, Card, Spin, Row, Col, Space } from 'antd'
import useSWR from 'swr'
import SelectYear from './SelectYear'
import {
  // getMonthStartTime,
  transformYearEndTime,
  transformYearStartTime
} from '../util/dateCompute'
// import SelectMonth from './SelectMonth'

interface Options {
  dateRange: string[]
  period: string
  source?: string
  selection?: string
  year?: string
  month?: number
}

interface Props {
  url: string
  options: Options
  extra?: any
}

// operation tongji detail
function ContentByOrg({ url, options, extra }: Props) {
  const newUrl = `${url}?year=${options.year}`

  // if (options.month === 0 || options.month === null) console.log('all')
  // else {
  //   const date = `${options.year}-${options.month}`
  //   console.log('date', date)
  //   console.log(getMonthStartTime(date))
  // }

  const swrOptions = {
    refreshInterval: 0
  }
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data: elements } = useSWR(newUrl, fetcher, swrOptions)

  if (elements?.length) {
    // const keylist = Object.keys(elements[0])
    const columns = [
      {
        title: '机构',
        dataIndex: 'label',
        key: 'label',
        width: `${100 / 9}%`,
        align: 'center' as 'center'
      },
      {
        title: 'H5创意案例',
        dataIndex: 'template',
        key: 'template',
        align: 'center' as 'center',
        children: [
          {
            title: '制作数量',
            dataIndex: 'h5_count',
            key: 'h5_count',
            width: `${100 / 9}%`,
            align: 'center' as 'center'
          },
          {
            title: '发布数量',
            dataIndex: 'h5_release_count',
            key: 'h5_release_count',
            width: `${100 / 9}%`,
            align: 'center' as 'center'
          },
          {
            title: '总访问量',
            dataIndex: 'total_visits',
            key: 'total_visits',
            width: `${100 / 9}%`,
            align: 'center' as 'center'
          },
          {
            title: '平均访问量',
            dataIndex: 'ave_visits',
            key: 'ave_visits',
            width: `${100 / 9}%`,
            align: 'center' as 'center'
          }
        ]
      },
      {
        title: '海报创意案例',
        dataIndex: 'poster_count',
        key: 'poster_count',
        width: `${100 / 9}%`,
        align: 'center' as 'center'
      },
      {
        title: '一物一码',
        dataIndex: 'qrcode',
        key: 'qrcode',
        align: 'center' as 'center',
        children: [
          {
            title: '制作数量',
            dataIndex: 'qrcode_count',
            key: 'qrcode_count',
            width: `${100 / 9}%`,
            align: 'center' as 'center'
          },
          {
            title: '总访问量',
            dataIndex: 'qrcode_total_visits',
            key: 'qrcode_total_visits',
            width: `${100 / 9}%`,
            align: 'center' as 'center'
          },
          {
            title: '平均访问量',
            dataIndex: 'qrcode_avg_visits',
            key: 'qrcode_avg_visits',
            width: `${100 / 9}%`,
            align: 'center' as 'center'
          }
        ]
      }
    ]

    const data = []

    for (let i = 0; i < elements.length; i++) {
      Object.defineProperty(elements[i], 'key', { value: i })
      Object.defineProperty(elements[i], 'h5_release_count', {
        value: (
          <a
            href={`/v3/admin/tongji/h5?org_id=${
              elements[i].org_id
            }&start_time=${transformYearStartTime(
              options.year
            )}&end_time=${transformYearEndTime(options.year)}&review_state=1`}
            // target='_blank'
            rel='noreferrer'
            key={`release${i}`}
          >
            {elements[i].h5_release_count}
          </a>
        )
      })
      Object.defineProperty(elements[i], 'h5_count', {
        value: (
          <a
            href={`/v3/admin/tongji/h5?org_id=${
              elements[i].org_id
            }&start_time=${transformYearStartTime(
              options.year
            )}&end_time=${transformYearEndTime(options.year)}`}
            // target='_blank'
            rel='noreferrer'
            key={`publish${i}`}
          >
            {elements[i].h5_count}
          </a>
        )
      })
      Object.defineProperty(elements[i], 'qrcode_count', {
        value: (
          <a
            href={`/v3/review/referralUrl?tab=qrcode&org_id=${
              elements[i].org_id
            }&start_time=${transformYearStartTime(
              options.year
            )}&end_time=${transformYearEndTime(options.year)}`}
            rel='noreferrer'
            key={`qrcode${i}`}
          >
            {elements[i].qrcode_count}
          </a>
        )
      })
      data[i] = elements[i]
    }

    return (
      <div style={{ textAlign: 'right' }}>
        <Card>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Space size='large'>
                <div className='extraContent'>{extra}</div>
                <SelectYear />
                {/* <SelectMonth /> */}
              </Space>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table columns={columns} dataSource={data} bordered />
            </Col>
          </Row>
        </Card>
      </div>
    )
  } else if (elements?.length === 0) {
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

export default ContentByOrg
