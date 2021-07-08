import React from 'react'
import { Row, Col, Spin } from 'antd'
import useSWR from 'swr'
import styles from './index.module.less'
import { getFormatedNumber } from '../util/util'

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
    const titleList = ['曝光量（人次）', '点击量（人次）']
    const data = [elements.total.exposure, elements.total.click]
    const unitList = ['亿', '万']
    const keyStateList = ['exposure', 'click']
    for (let i = 0; i < titleList.length; i++) {
      cardConent[i] = {
        titleList: titleList[i],
        dataList: data[i],
        unit: unitList[i],
        keyState: keyStateList[i]
      }
    }

    return (
      <div className={styles.orgSummary}>
        <Row>
          {cardConent.map((e, i) => {
            return (
              <Col span={10} offset={2} key={i}>
                <p style={{ fontSize: '1.5em' }}>{e.titleList}</p>
                <h1>
                  {getFormatedNumber(e.dataList, e.keyState)}
                  {e.unit}
                </h1>
                <p style={{ color: 'grey' }}>{e.dataList}</p>
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
