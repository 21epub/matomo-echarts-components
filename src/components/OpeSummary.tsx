import React from 'react'
import { Row, Col, Spin, Card } from 'antd'
import useSWR from 'swr'
import styles from './index.module.less'

interface Props {
  url: string
}

function OpeSummary({ url }: Props) {
  const swrOptions = {
    refreshInterval: 0
  }
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data: elements } = useSWR(url, fetcher, swrOptions)

  if (elements?.length && elements?.length !== 0) {
    const cardConent = []
    const titleList = ['今日登录', '本周登录', '本月登录', '本年登录']

    const data = [elements.today, elements.week, elements.month, elements.year]

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

export default OpeSummary
