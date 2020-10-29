import React, { useEffect, useState, useContext } from 'react'

import {
  AppContext,
  // TransformTrend,
  // Trend,
  TrendDetailFilter,
  EchartsMap
  // Barchart
  // Detail,
  // InstallButton
} from '@21epub/matomo-echarts-components'
import '@21epub/matomo-echarts-components/dist/index.css'
import 'antd/dist/antd.css'
import { Col, Row } from 'antd'

const TestOptions = () => {
  const { state: options } = useContext(AppContext)

  // const detailLink: string = '#'
  // // const mapTitle:string = '地域分布';
  // const barchartTitle: string = '扩展渠道'
  // const promoteTitle:string = "推广分析";
  // const trendTitle:string = "趋势图";
  const [createTime, setCreateTime] = useState('')
  useEffect(() => {
    setTimeout(() => {
      setCreateTime('2020-10-20')
    }, 2000)
  }, [])

  // const extra = [<div>test1</div>]

  return (
    <div>
      {/* <Row gutter={[16, 16]}>
          <Col span={24}>
            <Summary url="url" create_time={createTime}/>
          </Col>
        </Row> */}
      {/* <InstallButton downloadUrl='testurl' /> */}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <TrendDetailFilter />
        </Col>
      </Row>
      {/* <Row gutter={[16, 16]}>
        <Col span={24}>
          <Trend
            url='url'
            options={options}
            cardTitle='test'
            isDetailVersion
            createTime={createTime}
          />
        </Col>
      </Row> */}
      {/* <Row gutter={[16, 16]}>
        <Col span={24}>
          <TransformTrend
            summaryUrl='url'
            optionsUrl='url'
            createTime={createTime}
            options={options}
            extra={[]}
          />
        </Col>
      </Row> */}
      {/* <Row gutter={[16, 16]}>
          <Col span={24}>
            <Barchart
              // url="url" 
              url="https://yapi.epub360.com/mock/76/v3/api/tongji/{book_slug}/campaign/"
              options={options}
              detailLink='#'
              cardTitle="#"
              isDetailVersion
              createTime ={createTime}
            />
          </Col>
        </Row> */}
      {/* <Row gutter={[16, 16]}>
          <Col span={24}>
            <Detail
              url="https://yapi.epub360.com/mock/76/v3/api/tongji/{book_slug}/campaign/"
              options={options}
              createTime ={createTime}
              detailType='barchart'
              extra={[]}
            />
          </Col>
        </Row> */}

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <EchartsMap
            url='url'
            options={options}
            detailLink='#'
            cardTitle='#'
            isDetailVersion
            createTime={createTime}
          />
        </Col>
      </Row>

      {/* <Row gutter={[16, 16]}>
          <Col span={24}>
            <Filter />
          </Col>
        </Row> */}

      {/* <Row gutter={[16, 16]}>
          <Col span={24}>
            <Detail
              url="url"
              options={options}
              detailType="barchart"
              create_time ={create_time}
            />
          </Col>
        </Row> */}
    </div>
  )
}

export default TestOptions
