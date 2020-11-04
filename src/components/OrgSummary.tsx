import React from 'react'
import { Row, Col, Spin, Card } from 'antd'
import useSWR from 'swr'
import styles from './index.module.less'

type Options = {
  dateRange: string[]
  period: string
}

interface Props {
  url: string
  options: Options
}

function OrgSummary({ url, options }: Props) {
  const period = options.period
  const startDate = options.dateRange[0]
  const endDate = options.dateRange[1]

  let newUrl = ''
  if (startDate && endDate) {
    newUrl = `${url}?period=${period}&start_time=${startDate.replace(
      /\//g,
      '-'
    )}&end_time=${endDate.replace(/\//g, '-')}`
  }

  const swrOptions = {
    refreshInterval: 0
  }
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data: elements } = useSWR(newUrl, fetcher, swrOptions)

  if (elements && elements.length !== 0) {
    const cardConent = []
    const titleList = [
      '新增浏览量（PV）',
      '新增访客数（UV）',
      '新增转发数',
      '新增数据记录（个）'
    ]
    const data = [
      elements.total.nb_hits,
      elements.total.nb_uniq_visitors,
      elements.total.forwarding_number,
      elements.total.add_data
    ]
    for (let i = 0; i < titleList.length; i++) {
      cardConent[i] = {
        titleList: titleList[i],
        dataList: data[i]
      }
    }

    return (
      <div className={styles.orgSummary}>
        <Card>
          <Row>
            {cardConent.map((e, i) => {
              return (
                <Col span={5} offset={1} key={i}>
                  <p>{e.titleList}</p>
                  <h1>{e.dataList}</h1>
                </Col>
              )
            })}
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

export default OrgSummary
