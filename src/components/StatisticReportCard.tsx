import { Card, Col, Row } from 'antd'
import React from 'react'
import Filter from './Filter'
import styles from './index.module.less'
import StatisticReportTrend from './StatisticReportTrend'
import StatisticReportSummary from './StatisticReportSummary'
import useSWR from 'swr'

type Options = {
  dateRange: string[]
  period: string
}

interface Props {
  url: string
  options: Options
  title: any
}

export default function StatisticReportCard({ url, options, title }: Props) {
  const period = options.period
  const startDate = options.dateRange[0]
  const endDate = options.dateRange[1]

  const newUrl = `${url}?period=${period}&start_time=${startDate.replace(
    /\//g,
    '-'
  )}&end_time=${endDate.replace(/\//g, '-')}`

  const swrOptions = {
    refreshInterval: 0
  }
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data: elements } = useSWR(newUrl, fetcher, swrOptions)

  let daterangeContent = `${startDate}-${endDate}`
  if (period === 'all' || period === 'total') {
    daterangeContent = ''
  }

  const extra = <Filter isStatisticReportVersion />

  return (
    <div className={styles.homePageCard}>
      <Card title={title} extra={extra}>
        <Row align='middle'>
          <Col span={7} offset={1}>
            <StatisticReportSummary elements={elements} />
          </Col>
          <Col span={16}>
            <StatisticReportTrend
              elements={elements}
              daterangeContent={daterangeContent}
            />
          </Col>
        </Row>
      </Card>
    </div>
  )
}
