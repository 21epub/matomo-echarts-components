import React from 'react'
import { Table, Card, Spin, Col, Row } from 'antd'
import useSWR from 'swr'
import SelectYear from './SelectYear'
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
}

// operation tongji detail
function Resource({ url, options }: Props) {
  const newUrl = `${url}?year=${options.year}`

  const swrOptions = {
    refreshInterval: 0
  }
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data: elements } = useSWR(newUrl, fetcher, swrOptions)

  const columns = [
    {
      title: '月份',
      dataIndex: 'label',
      key: 'label',
      align: 'center' as 'center',
      width: `25%`
    },
    {
      title: '模版',
      dataIndex: 'template',
      key: 'template',
      align: 'center' as 'center',
      children: [
        {
          title: 'H5模版使用情况',
          dataIndex: 'h5_count',
          key: 'h5_count',
          width: `25%`,
          align: 'center' as 'center'
        },
        {
          title: '海报模版使用情况',
          dataIndex: 'poster_count',
          key: 'poster_count',
          width: `25%`,
          align: 'center' as 'center'
        },
        {
          title: '产生访问量',
          dataIndex: 'total_visits',
          key: 'total_visits',
          width: `25%`,
          align: 'center' as 'center'
        }
      ]
    }
    // {
    //   title: '图片素材使用（次）',
    //   dataIndex: 'image_usage',
    //   key: 'image_usage',
    //   align: 'center' as 'center',
    //   width: `${100 / 5}%`
    // },
    // {
    //   title: '二维码链接库',
    //   dataIndex: 'code_usage',
    //   key: 'code_usage',
    //   align: 'center' as 'center',
    //   width: `${100 / 5}%`
    // }
  ]

  if (elements && elements.length !== 0 && elements.length !== undefined) {
    // const keylist = Object.keys(elements[0])

    const data = []

    for (let i = 0; i < elements.length; i++) {
      Object.defineProperty(elements[i], 'key', { value: i })
      data[i] = elements[i]
    }

    return (
      <div style={{ textAlign: 'right' }}>
        <Card>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <SelectYear />
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
  } else if (elements && elements.length === 0) {
    return (
      <div>
        <Card>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <SelectYear />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Table columns={columns} bordered />
            </Col>
          </Row>
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

export default Resource
