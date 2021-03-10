import React, { useEffect, useState, useContext } from 'react'

import {
  AppContext,
  // EchartsMapMobile,
  // OpeFilter,
  // CaseDetail,
  // OrgSummary,
  // TransformTrend
  // HomePageTrend,
  // TrendDetailFilter,
  EchartsMap,
  // HomePageCard,
  // OpeBarchart,
  ContentByTime,
  ContentByOrg
  // OpeSummary,
  // Detail
  // Runchart,
  // SelectPeriod,
  // Resource
  // OpeDetail,
  // SelectMonth,
  // Barchart,
  // Detail,
  // HorizontalBarchart,
  // CampaignChart,
  // CampaignDetail,
  // CampaignChartMobile
  // HorizontalBarchartMobile,
  // VisitorsList,
  // EquipmentDetail,
  // Trend
  // InstallButton,
  // Promote,
  // Summary,
  // Funnel,
  // CaseDetail,
  // CaseDetailMobile,
  // TransformTrendMobile,
  // TrendMobile,
  // SummaryMobile
  // FunnelDetail,
  // Filter
} from '@21epub/matomo-echarts-components'
import '@21epub/matomo-echarts-components/dist/index.css'
import 'antd/dist/antd.css'
import { Col, Row } from 'antd'

const TestOptions = () => {
  const { state: options } = useContext(AppContext)
  // const test = "北京"
  // const detailLink: string = '#'
  // // const mapTitle:string = '地域分布';
  // const barchartTitle: string = '扩展渠道'
  // const promoteTitle:string = "推广分析";
  // const trendTitle:string = "趋势图";
  const [createTime, setCreateTime] = useState('')
  useEffect(() => {
    setTimeout(() => {
      setCreateTime('2020-10-20')
    }, 10)
  }, [])

  // const extra = [<div>test1</div>]

  return (
    <div>
      {/* <Col span={24}>
        <Card style={{backgroundColor:"grey"}}>
        <Filter isOrgVersion />
        </Card>
      </Col> */}
      {/* <Row gutter={[16, 16]}>
        <Col span={12}>
          <Barchart
            url='https://yapi.epub360.com/mock/76/v3/api/tongji/org/%7Borg_id%7D/channel/'
            options={options}
            detailLink='#'
            cardTitle='#'
            createTime={createTime}
          />
        </Col>
      </Row> */}
      {/* <Row gutter={[16, 16]}> */}
      {/* <Col span={24}>
          <OpeFilter isTongjiSelection />
        </Col> */}
      {/* <Col span={24}>
          <SelectPeriod />
        </Col> */}
      {/* <Col span={24}>
          <SelectMonth />
        </Col> */}
      {/* <Col span={24}>
          <OpeSummary url='https://yapi.epub360.com/mock/111/v3/api/yunying/epub360/login/time/summary/' />
        </Col> */}
      <Col span={24}>
        <ContentByOrg
          url='https://yapi.epub360.com/mock/111/v3/api/yunying/content/org/'
          options={options}
          extra={<div>测试啊啊啊是</div>}
        />
      </Col>
      <Col span={24}>
        <ContentByTime
          url='https://yapi.epub360.com/mock/111/v3/api/yunying/content/time/'
          options={options}
          extra={<div>aaa</div>}
        />
      </Col>
      {/* </Row> */}

      {/* <Col span={24}>
          <Resource
            url='https://yapi.epub360.com/mock/111/v3/api/yunying/resources/'
            options={options}
          />
        </Col> */}
      {/* <Col span={24}>
          <OpeFilter isOrgSelection />
        </Col>*/}
      {/* <Col span={24}>
          <OpeBarchart
            url='https://yapi.epub360.com/mock/111/v3/api/yunying/login/org/'
            options={options}
          />
        </Col> */}
      {/* </Row> */}
      {/* <Col span={24}>
        <Runchart
          url='https://yapi.epub360.com/mock/111/v3/api/yunying/login/time/visits/'
          options={options}
        />
      </Col> */}
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
            title='Aaa'
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
            <Summary url="https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/summary/" createTime={createTime}/>
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
            url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/visits/'
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
          <CampaignDetail
            url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/campaign/'
            labelUrl="https://yapi.epub360.com/mock/36/v3/api/works/%7Bbook_slug%7D/channel/"
            options={options}
            createTime={createTime}
            detailType='Ad'
            extra={[]}
          />
        </Col>
      </Row> */}
      {/* <Row gutter={[16, 16]}>
        <Col span={12}>
          <CampaignChart
            url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/campaign/'
            labelUrl="https://yapi.epub360.com/mock/36/v3/api/works/%7Bbook_slug%7D/channel/"
            options={options}
            detailLink='#'
            cardTitle='广告活动'
            createTime={createTime}
            // isOrg
          />
        </Col>
      </Row> */}
      {/* <Row gutter={[16, 16]}>
        <Col span={24}>
          <CampaignChart
            url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/campaign/'
            labelUrl="https://yapi.epub360.com/mock/36/v3/api/works/%7Bbook_slug%7D/channel/"
            options={options}
            cardTitle='广告活动'
            createTime={createTime}
            isDetailVersion
          />
        </Col>
      </Row> */}
      {/* <Row gutter={[16, 16]}>
        <Col span={24}>
          <CampaignChartMobile
            url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/campaign/'
            labelUrl="https://yapi.epub360.com/mock/36/v3/api/works/%7Bbook_slug%7D/channel/"
            options={options}
            cardTitle='广告活动手机'
            createTime={createTime}
            isDetailVersion
          />
        </Col>
      </Row> */}
      {/* 
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Funnel
            url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/funnel/'
            options={options}
            detailLink='#'
            cardTitle='作品按钮点击事件触发次数'
            createTime={createTime}
            isDetailVersion
          />
        </Col>
      </Row> */}

      {/* <Row gutter={[16, 16]}>
        <Col span={24}>
          <FunnelDetail
            url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/funnel/'
            options={options}
            createTime={createTime}
            detailType='funnel'
            extra={[]}
          />
        </Col>
      </Row> */}

      {/* <Row gutter={[16, 16]}>
        <Col span={24}>
          <VisitorsList
            options={options}
            url='https://yapi.epub360.com/mock/76/v3/api/tongji/org/%7Borg_id%7D/visitors/'
            pre='/v3/matomo/'
          />
        </Col>
      </Row> */}
      {/* <Row gutter={[16, 16]}>
        <Col span={10}>
          <HorizontalBarchart
            // isPicVersion
            url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/device/type/'
            options={options}
            detailLink='#'
            cardTitle='#'
            createTime={createTime}
            // isDetailVersion
          />
        </Col>
      </Row> */}
      {/* <Row gutter={[16, 16]}>
        <Col span={24}>
          <EquipmentDetail
            url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/device/brand/'
            options={options}
            createTime={createTime}
            detailType='system'
            extra={[]}
          />
        </Col>
      </Row> */}
      {/* <Row gutter={[16, 16]}>
        <Col span={24}>
          <CaseDetailMobile
            url='https://yapi.epub360.com/mock/76/v3/api/tongji/org/%7Borg_id%7D/top10/'
            options={options}
            // end={`?org=${test}`}
          />
        </Col>
      </Row> */}

      {/* <Row gutter={[16, 16]}>
        <Col span={24}>
          <TransformTrendMobile
            summaryUrl='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/transform/'
            optionsUrl='https://yapi.epub360.com/mock/76/v3/api/tongji/idgoal/'
            createTime={createTime}
            options={options}
            extra={[]}
          />
        </Col>
      </Row> */}

      {/* <Row gutter={[16, 16]}>
        <Col span={24}>
          <TrendMobile
            url='https://yapi.epub360.com/mock/76/v3/api/tongji/org/%7Borg_id%7D/visits/'
            options={options}
            cardTitle='test'
            createTime={createTime}
          />
        </Col>
      </Row>  */}

      {/* <Row gutter={[16, 16]}>
          <Col span={24}>
            <SummaryMobile url="https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/summary/" createTime={createTime}/>
          </Col>
      </Row> */}

      {/* <Row gutter={[16, 16]}>
        <Col span={24}>
          <EchartsMapMobile
            url='https://yapi.epub360.com/mock/76/v3/api/tongji/org/%7Borg_id%7D/map/'
            options={options}
            detailLink='#'
            cardTitle='#'
            isDetailVersion
            isOrgVersion
            createTime={createTime}
          />
        </Col>
      </Row> */}

      {/* <Row gutter={[16, 16]}>
        <Col span={24}>
          <HorizontalBarchartMobile
            // isPicVersion
            // url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/device/brand/'
            url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/device/type/'
            options={options}
            detailLink='#'
            cardTitle='#'
            createTime={createTime}
            isDetailVersion
            isPicVersion
          />
        </Col>
      </Row> */}
    </div>
  )
}

export default TestOptions
