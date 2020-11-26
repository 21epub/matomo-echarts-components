import React, { useEffect, useState, useContext } from 'react'

import {
  AppContext,
  OpeFilter,
  // CaseDetail,
  // OrgSummary,
  // TransformTrend
  // HomePageTrend,
  // TrendDetailFilter,
  EchartsMap,
  // HomePageCard,
  OpeBarchart,
  // ContentByTime,
  ContentByOrg,
  // OpeSummary,
  // Detail
  Runchart,
  SelectYear,
  Resource
  // OpeDetail
  // Barchart
  // Detail
  // InstallButton,
  // Promote
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
    }, 100)
  }, [])

  // const extra = [<div>test1</div>]

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <OpeFilter isTongjiSelection />
        </Col>
        <Col span={24}>
          <SelectYear />
        </Col>
        {/* <Col span={24}>
          <OpeSummary url='https://yapi.epub360.com/mock/111/v3/api/yunying/epub360/login/time/summary/' />
        </Col> */}
        <Col span={24}>
          <ContentByOrg
            url='https://yapi.epub360.com/mock/111/v3/api/yunying/content/org/'
            options={options}
          />
        </Col>
        <Col span={24}>
          <Resource
            url='https://yapi.epub360.com/mock/111/v3/api/yunying/resources/'
            options={options}
          />
        </Col>
        {/* <Col span={24}>
          <OpeFilter isOrgSelection />
        </Col>*/}
        <Col span={24}>
          <OpeBarchart
            url='https://yapi.epub360.com/mock/111/v3/api/yunying/login/org/'
            options={options}
          />
        </Col>
      </Row>
      <Col span={24}>
        <Runchart
          url='https://yapi.epub360.com/mock/111/v3/api/yunying/login/time/visits/'
          options={options}
        />
      </Col>
      {/* <Col span={24}>
          <OpeDetail 
          url="https://yapi.epub360.com/mock/111/v3/api/yunying/login/org/" 
          options={options}
          detailType="byOrg"
          />
        </Col>
      </Row> */}
      {/* <Row gutter={[16, 16]}>
        <Col span={24}>
          <HomePageTrend
            url='https://yapi.epub360.com/mock/76/v3/api/tongji/visits/'
            options={options}
          />
        </Col>
      </Row> */}
      {/* <Row gutter={[16, 16]}>
        <Col span={24}>
          <HomePageCard
            url='https://yapi.epub360.com/mock/76/v3/api/tongji/visits/'
            options={options}
          />
        </Col>
      </Row> */}

      {/* <Row gutter={[16, 16]}>
        <Col span={24}>
          <CaseDetail
            url='https://yapi.epub360.com/mock/76/v3/api/tongji/org/%7Borg_id%7D/top10/'
            options={options}
          />
        </Col>
      </Row> */}
      {/* <Row gutter={[16, 16]}>
        <Col span={24}>
          <OrgSummary
            url='https://yapi.epub360.com/mock/76/v3/api/tongji/visits/'
            options={options}
            isHomePageVersion
          />
        </Col>
      </Row> */}
      {/* <Row gutter={[16, 16]}>
          <Col span={24}>
            <Summary url="url" create_time={createTime}/>
          </Col>
        </Row> */}
      {/* <InstallButton downloadUrl='testurl' /> */}
      {/* <Row gutter={[16, 16]}>
        <Col span={24}>
          <TrendDetailFilter />
        </Col>
      </Row> */}
      {/* <Row gutter={[16, 16]}>
        <Col span={12}>
          <Trend
            url='https://yapi.epub360.com/mock/76/v3/api/tongji/org/%7Borg_id%7D/visits/'
            options={options}
            cardTitle='test'
            isOrgVersion
          />
        </Col>
      </Row> */}
      {/* 
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Barchart
            url='https://yapi.epub360.com/mock/76/v3/api/tongji/org/%7Borg_id%7D/campaign/'
            options={options}
            detailLink='#'
            cardTitle='#'
            createTime={createTime}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Trend
            url='https://yapi.epub360.com/mock/76/v3/api/tongji/org/%7Borg_id%7D/visits/'
            options={options}
            cardTitle='test'
            createTime={createTime}
            isDetailVersion
          />
        </Col>
      </Row> */}

      {/* <Row gutter={[16, 16]}>
        <Col span={24}>
          <TransformTrend
            summaryUrl='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/transform/'
            optionsUrl='https://yapi.epub360.com/mock/76/v3/api/tongji/idgoal/'
            createTime={createTime}
            options={options}
            extra={[]}
          />
        </Col>
      </Row> */}

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <EchartsMap
            url='https://yapi.epub360.com/mock/76/v3/api/tongji/org/%7Borg_id%7D/map/'
            options={options}
            detailLink='#'
            cardTitle='#'
            isDetailVersion
            isOrgVersion
            createTime={createTime}
          />
        </Col>
      </Row>

      {/* <Row gutter={[16, 16]}>
          <Col span={24}>
            <Promote
              url="https://yapi.epub360.com/mock/76/v3/api/tongji/org/%7Borg_id%7D/campaign/"
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
            url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/map/'
            options={options}
            createTime={createTime}
            detailType='mapOrg'
            extra={[]}
          />
        </Col>
      </Row> */}
    </div>
  )
}

export default TestOptions
