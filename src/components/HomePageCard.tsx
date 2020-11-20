import { Card, Col, Row } from 'antd'
import React from 'react'
import Filter from './Filter'
import OrgSummary from './OrgSummary'
import HomePageTrend from './HomePageTrend'
import styles from './index.module.less'

type Options = {
  dateRange: string[]
  period: string
}

interface Props {
  url: string
  options: Options
}

function HomePageCard({ url, options }: Props) {
  const extra = <Filter isHomePageVersion />
  return (
    <div className={styles.homePageCard}>
      <Card title='成效统计' extra={extra}>
        <Row align='middle'>
          <Col span={8}>
            <OrgSummary url={url} options={options} isHomePageVersion />
          </Col>
          <Col span={16}>
            <HomePageTrend url={url} options={options} />
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default HomePageCard
