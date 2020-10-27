import React, { useContext } from 'react'
import {
  AppContext,
  DetailFilter,
  EchartsMap,
  Detail
} from '@21epub/matomo-echarts-components'
import { Col, Row } from 'antd'

const Example = () => {
  const { state: options } = useContext(AppContext)

  const detailLink: string = '#'
  const title: string = '地域分布'
  const createTime: string = '2020-10-20'

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <DetailFilter />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <EchartsMap
            url='https://yapi.epub360.com/mock/76/v3/api/tongji/{book_slug}/map/'
            options={options}
            detailLink={detailLink}
            cardTitle={title}
            isDetailVersion
            createTime={createTime}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Detail
            url='https://yapi.epub360.com/mock/76/v3/api/tongji/{book_slug}/campaign/'
            options={options}
            createTime={createTime}
            detailType='barchart'
            extra={[]}
          />
        </Col>
      </Row>
    </div>
  )
}

export default Example
