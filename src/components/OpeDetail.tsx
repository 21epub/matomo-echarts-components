import React from 'react'
import { Table, Card, Spin, Typography } from 'antd'
import { titleTranslate, compare } from '../util/util'
import useSWR from 'swr'
// import styles from './index.module.less'
const { Text } = Typography

interface Options {
  dateRange: string[]
  period: string
  source?: string
  selection?: string
  org?: string
}

interface Props {
  url: string
  options: Options
  detailType: string
}

// operation tongji detail
function OpeDetail({ url, options, detailType }: Props) {
  let newUrl
  if (detailType === 'byOrg') newUrl = `${url}?date=${options.selection}`
  else newUrl = `${url}?period=${options.selection}`

  const swrOptions = {
    refreshInterval: 0
  }
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data: elements } = useSWR(newUrl, fetcher, swrOptions)

  if (elements?.length) {
    const keys = Object.keys(elements[0])
    const keylist = keys.reverse()
    const columns = []
    for (let i = 0; i < keylist.length; i++) {
      columns[i] = {
        title: titleTranslate(`${detailType}${keylist[i]}`),
        dataIndex: keylist[i],
        width: '50%'
      }
    }
    const data = []
    if (detailType === 'byOrg') {
      for (let i = 0; i < elements.length; i++) {
        Object.defineProperty(elements[i], 'key', { value: i })
        data[i] = elements[i]
      }
    } else {
      for (let i = 0; i < elements.length; i++) {
        Object.defineProperty(elements[i], 'key', { value: i })
        data[i] = elements[i]
      }
      data.sort(compare('key'))
    }

    return (
      <div>
        <Card title='详细数据列表'>
          <Table
            pagination={{ pageSize: 20 }}
            columns={columns}
            dataSource={data}
            summary={(data) => {
              let visitsSum = 0
              /* eslint-disable */
              data.forEach(({ visits }) => {
                visitsSum += visits
              })
              /* eslint-enable */
              return (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0}>
                    <Text strong>总计</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>
                    <Text strong>{visitsSum}</Text>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              )
            }}
          />
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

export default OpeDetail
