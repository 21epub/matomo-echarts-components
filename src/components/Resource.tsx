import React from 'react'
import { Table, Card, Spin, Row, Col, Space, Typography } from 'antd'
import useSWR from 'swr'
import SelectYear from './SelectYear'
// import styles from './index.module.less'
const { Text } = Typography

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
function Resource({ url, options, extra }: Props) {
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

  if (elements?.length) {
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
              <Space size='large'>
                <div className='extraContent'>{extra}</div>
                <SelectYear />
              </Space>
            </Col>
          </Row>          
          <Row>
            <Col span={24}>
              <Table 
                columns={columns}
                dataSource={data}
                bordered 
                summary={(data) => {
                  let h5CountSum = 0
                  let posterSum = 0
                  let h5TotalVisits = 0
                  /* eslint-disable */
                  data.forEach(
                    ({ h5_count, total_visits, poster_count }) => {
                      h5CountSum += h5_count
                      h5TotalVisits += total_visits
                      posterSum += poster_count
                    }
                  )
                  /* eslint-enable */

                  return (
                    <Table.Summary.Row style={{ textAlign: 'center' }}>
                      <Table.Summary.Cell index={0}>
                        <Text strong>总计</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={1}>
                        <Text strong>{h5CountSum}</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={2}>
                        <Text strong>{posterSum}</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={3}>
                        <Text strong>{h5TotalVisits}</Text>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                  )
                }}
              />
            </Col>
          </Row>
        </Card>
      </div>
    )
  } else if (elements?.length === 0) {
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
