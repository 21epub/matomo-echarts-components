import { Card, Col, Row } from 'antd'
import React from 'react'
import Filter from './Filter'
import ReachSummary from './ReachSummary'
import ReachTrend from './ReachTrend'
import styles from './index.module.less'

type Options = {
  dateRange: string[]
  period: string
}

interface Props {
  url: string
  options: Options
  title: any
}

function HomeReachCard({ url, options, title }: Props) {
  const extra = <Filter isHomePageVersion />
  return (
    <div className={styles.homePageCard}>
      <Card title={title} extra={extra}>
        <Row align='middle'>
          <Col span={8}>
            <ReachSummary url={url} options={options} />
          </Col>
          <Col span={16}>
            <ReachTrend url={url} options={options} />
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default HomeReachCard
