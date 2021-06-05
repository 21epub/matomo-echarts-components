import React from 'react'
import { Row, Col, Spin } from 'antd'
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

function ReachSummary({ url, options }: Props) {
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

  if (elements?.total) {
    const cardConent = []
    const titleList = ['曝光量', '点击量']
    const data = [elements.total.exposure, elements.total.click]
    for (let i = 0; i < titleList.length; i++) {
      cardConent[i] = {
        titleList: titleList[i],
        dataList: data[i]
      }
    }

    return (
      <div className={styles.orgSummary}>
        <Row>
          {cardConent.map((e, i) => {
            return (
              <Col span={10} offset={2} key={i}>
                <p>{e.titleList}</p>
                <h1>{e.dataList}</h1>
              </Col>
            )
          })}
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
}

export default ReachSummary
