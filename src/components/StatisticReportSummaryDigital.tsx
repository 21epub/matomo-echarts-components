import React from 'react'
import { Row, Col, Spin } from 'antd'
import styles from './index.module.less'
import { getTabSum } from '../util/util'

interface Props {
  elements: Record<string, any>
}

export default function StatisticReportSummary({ elements }: Props) {
  if (elements) {
    const cardConent = []
    const titleList = ['数字大屏', 'H5']
    const data = [getTabSum('cbt', elements), getTabSum('h5', elements)]

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
              <Col span={8} key={i}>
                <p>新增{e.titleList}</p>
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
