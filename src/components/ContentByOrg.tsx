import React from 'react'
import { Table, Card, Spin, Row, Col, Space } from 'antd'
import useSWR from 'swr'
import SelectYear from './SelectYear'
import {
  transformYearEndTime,
  transformYearStartTime
} from '../util/dateCompute'
// import styles from './index.module.less'

interface Options {
  dateRange: string[]
  period: string
  source?: string
  selection?: string
  year?: string
}

interface Props {
  url: string
  options: Options
  extra?: any
}

// operation tongji detail
function ContentByOrg({ url, options, extra }: Props) {
  const newUrl = `${url}?year=${options.year}`

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
        width: `${100 / 6}%`,
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
            width: `${100 / 6}%`,
            align: 'center' as 'center'
          },
          {
            title: '发布数量',
            dataIndex: 'h5_release_count',
            key: 'h5_release_count',
            width: `${100 / 6}%`,
            align: 'center' as 'center'
          },
          {
            title: '总访问量',
            dataIndex: 'total_visits',
            key: 'total_visits',
            width: `${100 / 6}%`,
            align: 'center' as 'center'
          },
          {
            title: '平均访问量',
            dataIndex: 'ave_visits',
            key: 'ave_visits',
            width: `${100 / 6}%`,
            align: 'center' as 'center'
          }
        ]
      },
      {
        title: '海报创意案例',
        dataIndex: 'poster_count',
        key: 'poster_count',
        width: `${100 / 6}%`,
        align: 'center' as 'center'
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
            target='_blank'
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
            target='_blank'
            rel='noreferrer'
            key={`publish${i}`}
          >
            {elements[i].h5_count}
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
