import React,{useContext} from 'react'
import {AppContext,Filter,Trend} from '@21epub/matomo-echarts-components'
import '@21epub/matomo-echarts-components/dist/index.css'
//import 'antd/dist/antd.css';
import { Col, Row } from 'antd';


const TestOptions = () => {
  const { state: options} = useContext(AppContext);
  //const detailLink:string = "#";
  // const mapTitle:string = '地域分布';
  // const barchartTitle:string = "扩展渠道";
  // const promoteTitle:string = "推广分析";
  const trendTitle:string = "趋势图";


  return (
    <div>   
        {/* <Row gutter={[16, 16]}>
          <Col span={24}>
            <Detail url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/map/' options={options} detailType='map'/>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
          <Barchart url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/campaign/' options={options}  cardTitle={barchartTitle} isDetailVersion={true}/>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
          <Trend url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/visits/' options={options} cardTitle={trendTitle} isDetailVersion={false}/>
          </Col>
          <Col span={12}>
          <Barchart url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/campaign/' options={options} cardTitle={barchartTitle}/>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={12}>
          <Promote url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/campaign/'options={options} cardTitle={promoteTitle} isDetailVersion={false}/>
          </Col>
          <Col span={12}>
          <EchartsMap url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/map/' options={options}  cardTitle={mapTitle} isDetailVersion={false}/>
          </Col>
        </Row> */}
        <Row gutter={[16, 16]}>
          <Col span={24}>
          <Filter/>  
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
          <Trend url='https://yapi.epub360.com/mock/76/v3/api/tongji/%7Bbook_slug%7D/visits/' options={options} cardTitle={trendTitle} isDetailVersion={true}/> 
          </Col>
        </Row>
 

    </div>
    )
}

export default TestOptions
