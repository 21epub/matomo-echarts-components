import React,{useContext} from 'react'
import {Barchart,AppContext,Filter,Promote,Trend,Summary,EchartsMap} from '@21epub/matomo-echarts-components'

import '@21epub/matomo-echarts-components/dist/index.css'
import 'antd/dist/antd.css';
import { Col, Row } from 'antd';


const TestOptions = () => {
  const { state: options} = useContext(AppContext);
  const detailLink:string = "#";
  const barchartTitle:string = "扩展渠道";
  const promoteTitle:string = "推广分析";
  const trendTitle:string = "趋势图";
  const mapTitle:string = '地域分布';

  return (
    <div>   
        <h1>HelloWorld!!</h1>
        <Row gutter={[16, 16]}>
          <Col span={12}>
          <Trend url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/visits/' options={options} detailLink={detailLink} cardTitle={trendTitle}/>
          </Col>
          <Col span={12}>
          <Barchart url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/campaign/' options={options} detailLink={detailLink} cardTitle={barchartTitle} isShowDetailLink={false}/>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
          <Promote url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/campaign/'options={options} detailLink={detailLink} cardTitle={promoteTitle} isShowDetailLink={false}/>
          </Col>
          <Col span={12}>
          <EchartsMap url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/map/' options={options} detailLink={detailLink} cardTitle={mapTitle} isShowDetailLink={false}/>
          </Col>
        </Row>
        <Filter/>  
        <Summary url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/summary/'/>
        
    </div>
    )
}

export default TestOptions
